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

function TemplateSelector({setMarkdown}: TemplateSelectorProps) {
    const { userId } = useAuth();
    const { templates, fetchTemplates, deleteTemplate } = useTemplateStore();
    const [newTemplate, setNewTemplate] = useState({
        userId: "",
        title: "",
        content: "",
    });
    const [selectedTemplate, setSelectedTemplate] = useState("");
    
    useEffect(() => {
        if (userId) {
            fetchTemplates(userId);
        }
    }, [userId]);

    const sortedTemplates = [...templates].sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleCreateTemplate = async () => {
        // Implement template creation logic here
        // This would typically open a modal or form
        console.log("Create template clicked");
    };
    
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
        } else {
            toast.success(message);
        }
        console.log(success);
    };

    const handleUpdateTemplate = (value: string) => {
        console.log(`Update template ${value}`);
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
                        <div>
                            <Button 
                                className='m-1 bg-gray-100 dark:bg-gray-800 text-xs'
                                onClick={handleClearTemplate}
                            >
                                <CircleX/>Clear template
                            </Button>
                            <Button 
                                className='m-1 bg-gray-100 dark:bg-gray-800 text-xs'
                                onClick={handleCreateTemplate}
                            >
                                <PlusIcon/>Create template
                            </Button>
                        </div>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TemplateSelector