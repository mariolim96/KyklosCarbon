module.exports = {
  //   struct NFTData {
  //     uint256 projectVintageTokenId;
  //     string serialNumber;
  //     uint256 quantity;
  //     RetirementStatus status;
  //     string uri;
  //     string[] comments;
  //     address[] commentAuthors;
  // }
  NFTData: [
    {
      serialNumber: '0001',
      quantity: 1000,
      status: false,
    },
    {
      serialNumber: '0002',
      quantity: 1000,
      status: false,
    },
    {
      serialNumber: '0003',
      quantity: 1000,
      status: false,
    },
  ],
  projects: [
    {
      projectId: '0001',
      standard: 'VCS',
      methodology: 'VM0001',
      region: 'US',
      storageMethod: 'US',
      method: 'US',
      emissionType: 'US',
      category: 'US',
      uri: 'US',
      beneficiary: 'US',
      vintageData: {
        name: 'US',
        startTime: 'US',
        endTime: 'US',
        projectTokenId: 'US',
        totalVintageQuantity: 'US',
        isCorsiaCompliant: 'US',
        isCCPcompliant: 'US',
        coBenefits: 'US',
        correspAdjustment: 'US',
        addittionalCertification: 'US',
        uri: 'US',
      },
    },
  ],
}
// struct VintageData {
//     string name;
//     uint64 startTime; // UNIX timestamp
//     uint64 endTime; // UNIX timestamp
//     uint256 projectTokenId;
//     uint64 totalVintageQuantity;
//     bool isCorsiaCompliant;
//     bool isCCPcompliant;
//     string coBenefits;
//     string correspAdjustment;
//     string additionalCertification;
//     string uri;
// }

// struct ProjectData {
//   string projectId;
//   string standard;
//   string methodology;
//   string region;
//   string storageMethod;
//   string method;
//   string emissionType;
//   string category;
//   string uri;
//   address beneficiary;
// }
