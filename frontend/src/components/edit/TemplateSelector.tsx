import { useState, useEffect } from 'react';
import { useTemplateStore } from '@/store/template.store';
import { useAuth } from "@clerk/clerk-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CircleX, SquarePen, PlusIcon } from "lucide-react";
import DeleteDialog from './DeleteDialog';
import { toast } from "sonner"
import { TemplateSelectorProps } from '@/types/template.types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TemplateSelector({setMarkdown}: TemplateSelectorProps) {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { templates, fetchTemplates, deleteTemplate } = useTemplateStore();
    const [selectedTemplate, setSelectedTemplate] = useState("");
    
    useEffect(() => {
        if (userId) {
            fetchTemplates(userId);
        }
    }, [userId]);

    const sortedTemplates = [...templates].sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleSelectTemplate = (tid: string) => {
        setSelectedTemplate(tid);
        const template = templates.find(t => t._id === tid);
        if (template) {
            setMarkdown(template.content);
        }
    };

    const handleDeleteTemplate = async (tid: string) => {
        const {success, message} = await deleteTemplate(tid);
        if (!success) {
            toast.error(message);
            setSelectedTemplate("");
        } else {
            toast.success(message);
        }
        console.log(success);
    };

    const handleUpdateTemplate = (templateId: string) => {
        navigate(`/edit-template/${templateId}`);
    };

    const handleClearTemplate = () => {
        setSelectedTemplate("");
        setMarkdown("");
    }

    return (
        <div>
            <Select onValueChange={handleSelectTemplate} value={selectedTemplate}>
                <SelectTrigger className="w-[220px] bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
                    <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent className='bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700'>
                    <SelectGroup className='text-black dark:text-white'>
                        {sortedTemplates.map((template) => (
                            <div className='flex flex-row' key={template._id}>
                                <SelectItem value={template._id}>{template.title}</SelectItem>
                                <DeleteDialog handleDeleteTemplate={handleDeleteTemplate} template={template} />
                                <Button variant="ghost" size="icon" className="mt-[1px]" onClick={() => handleUpdateTemplate(template._id)}><SquarePen /></Button>
                            </div>
                        ))}
                        {templates.length === 0 && <div className='p-2 text-sm'>No templates found</div>}
                        <div key="template-actions">
                            <Button 
                                className='m-1 bg-gray-100 dark:bg-gray-800 text-xs'
                                onClick={handleClearTemplate}
                            >
                                <CircleX/>Clear template
                            </Button>
                            <Link to={'/create'}>
                                <Button className='m-1 bg-gray-100 dark:bg-gray-800 text-xs'>
                                    <PlusIcon/>Create template
                                </Button>
                            </Link>
                        </div>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TemplateSelector