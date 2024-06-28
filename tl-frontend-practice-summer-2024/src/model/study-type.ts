export enum StudyType {
  FLIP_CARDS = "FLIP_CARDS",
}

export const getStudyTypeName = (type: StudyType) => {
  switch (type) {
    case StudyType.FLIP_CARDS:
      return "Flip cards";
  }
};
