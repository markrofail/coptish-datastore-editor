import { InfoSection, MultiLingualText } from "@/types";
import { MultiLingualTextForm } from "../MultiLingualTextForm";

interface InfoSectionProps {
    section: InfoSection;
    onChange: (updatedSection: InfoSection) => void;
}

export const InfoSectionComponent = ({ section, onChange }: InfoSectionProps) => {
    const handleMultiLingualTextChange = (newValue: MultiLingualText) => {
        onChange({ ...section, text: newValue });
    };

    return <MultiLingualTextForm value={section.text} onChange={handleMultiLingualTextChange} />;
};
