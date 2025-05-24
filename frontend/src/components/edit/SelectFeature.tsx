import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectFeatureProps } from "@/types/component.types";

function SelectFeature({setSelectedFeature, selectedFeature}: SelectFeatureProps) {

    const handleSelectTemplate = (value: string) => {
        setSelectedFeature(value);
    };

  return (
    <Select onValueChange={handleSelectTemplate} value={selectedFeature}>
      <SelectTrigger className="w-[140px] lg:w-[220px] bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
        <SelectValue placeholder="Select Feature" />
      </SelectTrigger>
      <SelectContent className='bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 focus-visible:ring-0'>
        <SelectGroup className='text-black dark:text-white'>
          <SelectItem value="repos">Repository</SelectItem>
          <SelectItem value="templates">Template</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectFeature