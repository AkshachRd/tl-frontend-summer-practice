import { Card, CardBody } from "@nextui-org/card";

import { StudyType, getStudyTypeName } from "@/model/study-type";

export type SelectStudyTypeProps = {
  onSelect?: (type: StudyType) => void;
};

export const SelectStudyType = ({ onSelect }: SelectStudyTypeProps) => {
  const studyTypes = Object.values(StudyType);

  return (
    <section>
      {studyTypes.map((type) => (
        <Card key={type} isPressable onPress={() => onSelect?.(type)}>
          <CardBody>{getStudyTypeName(type)}</CardBody>
        </Card>
      ))}
    </section>
  );
};
