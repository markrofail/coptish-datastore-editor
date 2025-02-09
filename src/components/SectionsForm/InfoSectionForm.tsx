import { InfoSection, MultiLingualText } from "@/app/types";
import { MultiLingualTextForm } from "../MultiLingualTextForm";

interface InfoSectionProps {
  section: InfoSection;
  onChange: (updatedSection: InfoSection) => void;
}

export const InfoSectionComponent: React.FC<InfoSectionProps> = ({
  section,
  onChange,
}) => {
  const handleMultiLingualTextChange = (newValue: MultiLingualText) => {
    onChange({ ...section, text: newValue });
  };

  return (
    <MultiLingualTextForm
      value={section.text}
      onChange={handleMultiLingualTextChange}
    />
  );
};
