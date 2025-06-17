const censusData = [
    {
    id: 1,
    name: "Samer Mahmoud Al-Ali",
    houseCondition: "Diminished House",
    femaleOrphans: 2,
    otherCases: "No",
    specifyOtherCases: "Diabetes",
    errors: [
      "Original House Condition: Value not allowed",
      'Specify Other Cases should be empty if "Other Cases?" is No',
    ],
    },
    {
      id: 2,
      name: "Mohammad Abdul Rahim",
      houseCondition: "Totally Destroyed",
      femaleOrphans: -1,
      otherCases: "Yes",
      specifyOtherCases: "",
      errors: [
        "# Female Orphans: Cannot be negative",
        'Specify Other Cases must be filled if "Other Cases?" is Yes',
      ],
    },
    {
      id: 3,
      name: "Khaled Sameer Al-Eissa",
      houseCondition: "Good and Habitable",
      femaleOrphans: 0,
      otherCases: "Yes",
      specifyOtherCases: "Chronic illness",
      errors: ["(None)"],
    },
      ];
      
export default censusData