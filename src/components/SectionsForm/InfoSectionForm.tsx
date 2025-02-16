import { InfoSection, MultiLingualText, Occasion } from "@/types";
import { MultiLingualTextForm } from "../MultiLingualTextForm";
import { OccasionForm } from "../OccasionForm";

interface InfoSectionProps {
    section: InfoSection;
    onChange: (updatedSection: InfoSection) => void;
}

export const InfoSectionComponent = ({ section, onChange }: InfoSectionProps) => {
    const handleMultiLingualTextChange = (newValue: MultiLingualText) => {
        onChange({ ...section, text: newValue });
    };

    const handleOccasionChange = (value: Occasion | undefined) => {
        onChange({ ...section, occasion: value });
    };

    return (
        <>
            {/* Occasion Field */}
            <OccasionForm value={section.occasion} onChange={handleOccasionChange} />
            {/* InfoText Field */}
            <MultiLingualTextForm value={section.text} onChange={handleMultiLingualTextChange} />
        </>
    );
};
