import { useState, useEffect } from 'react';
import { UserAuth } from '@/contexts/FirebaseContext';
import { useTemplateStore } from '@/store/template.store';
import { Button } from "@/components/ui/button";
import { CircleX, SquarePen, PlusIcon, Search, Loader2, ChevronDown } from "lucide-react";
import DeleteDialog from './DeleteDialog';
import { toast } from "sonner";
import { TemplateSelectorProps } from '@/types/template.types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

function TemplateSelector({setMarkdown}: TemplateSelectorProps) {
    const { currentUser } = UserAuth();
    const userId = currentUser.providerData[0].uid;
    const navigate = useNavigate();
    const { templates, fetchTemplates, deleteTemplate } = useTemplateStore();
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const {success, message } = await fetchTemplates(userId);
                if (!success) throw Error(message);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching templates:", error);
                toast.error("Error fetching templates");
            } finally {
                setIsLoading(false);
            }
        };
        loadTemplates();
    }, [userId]);

    const sortedTemplates = [...templates].sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const filteredTemplates = sortedTemplates.filter(template => 
        template && template.title && template.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectTemplate = (tid: string) => {
        setSelectedTemplate(tid);
        const template = templates.find(t => t._id === tid);
        if (template) {
            setMarkdown(template.content);
        }
        setOpen(false);
    };

    const handleDeleteTemplate = async (tid: string) => {
        const {success, message} = await deleteTemplate(tid, userId);
        if (!success) {
            toast.error(message);
            setSelectedTemplate("");
        } else {
            toast.success(message);
            setSelectedTemplate("");
            setMarkdown("");
        }
    };

    const handleUpdateTemplate = (templateId: string) => {
        navigate(`/edit-template/${templateId}`);
    };

    const handleClearTemplate = () => {
        setSelectedTemplate("");
        setMarkdown("");
    };

    const getSelectedTemplateName = () => {
        const template = templates.find(t => t._id === selectedTemplate);
        return template ? template.title : "Select Template";
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="w-[140px] lg:w-[220px] justify-between bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white"
                >
                    <span className='truncate'>{getSelectedTemplateName()}</span><ChevronDown className="text-gray-400"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] lg:w-[340px] p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700">
                {isLoading ? (
                    <div className='p-2 text-center flex justify-center items-center'><Loader2 className='animate-spin text-sm text-black dark:text-white'/></div>
                ): (
                    <div className="p-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-8 flex-1 bg-transparent text-black dark:text-white border-gray-300 dark:border-neutral-700 focus-visible:ring-0"
                            />
                        </div>
                        <ScrollArea className="max-h-[200px]">
                            <div className="space-y-1 text-black dark:text-white">
                                {filteredTemplates.map((template) => (
                                    <div className="flex items-center justify-between" key={template._id}>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 justify-start font-normal truncate"
                                            onClick={() => handleSelectTemplate(template._id)}
                                        >
                                            {template.title}
                                        </Button>
                                        <div className="flex flex-row gap-x-1">
                                            <DeleteDialog handleDeleteTemplate={handleDeleteTemplate} template={template} />
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8" 
                                                onClick={() => handleUpdateTemplate(template._id)}
                                            >
                                                <SquarePen className="h-4 w-4 mt-[5px]" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredTemplates.length === 0 && <div className='p-2 text-sm'>No templates found</div>}
                            </div>
                        </ScrollArea>
                        <div className="mt-2 flex flex-row gap-x-2">
                            {selectedTemplate && (
                                <Button 
                                    variant="outline"
                                    className="text-red-500 dark:text-red-400 justify-center bg-gray-100 dark:bg-gray-800 text-xs"
                                    onClick={handleClearTemplate}
                                >
                                    <CircleX className="-mr-1 h-4 w-4"/>Unselect template
                                </Button>
                            )}
                            <Link to={'/create'} className="w-full">
                                <Button 
                                    variant="outline"
                                    className="text-black dark:text-white w-full justify-center bg-gray-100 dark:bg-gray-800 text-xs"
                                >
                                    <PlusIcon className="-mr-1 h-4 w-4"/>Create template
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default TemplateSelector;