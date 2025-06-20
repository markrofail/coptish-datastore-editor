import { InfoSection, MultiLingualText, Occasion } from "@/types";
import { MultiLingualTextForm } from "../../components/MultiLingualTextForm";
import { OccasionForm } from "../../components/OccasionForm";

interface InfoSectionProps {
    section: InfoSection;
    languages: (keyof MultiLingualText)[];
    onChange: (updatedSection: InfoSection) => void;
}

export const InfoSectionComponent = ({ section, languages, onChange }: InfoSectionProps) => {
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
            <MultiLingualTextForm
                languages={languages}
                value={section.text}
                onChange={handleMultiLingualTextChange}
                multiline
            />
        </>
    );
};
