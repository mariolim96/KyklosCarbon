// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

enum RetirementStatus {
    NotRetired,
    Retired,
    Cancelled
}

struct VintageData {
    /// @dev A human-readable string which differentiates this from other vintages in
    /// the same project, and helps build the corresponding TCO2 name and symbol.
    string name;
    uint64 startTime; // UNIX timestamp
    uint64 endTime; // UNIX timestamp
    uint256 projectTokenId;
    uint64 totalVintageQuantity;
    bool isCorsiaCompliant;
    bool isCCPcompliant;
    string coBenefits;
    string correspAdjustment;
    string additionalCertification;
    string uri;
}

// name: This is a human-readable string that distinguishes this specific vintage from other vintages within the same carbon reduction project. It's likely used for labeling and identification purposes.

// startTime: This attribute represents the start time of the vintage, typically expressed as a UNIX timestamp. The UNIX timestamp is a standardized way of representing time as the number of seconds since January 1, 1970.

// endTime: This attribute represents the end time of the vintage, also in UNIX timestamp format. The time period between startTime and endTime defines the duration of the vintage.

// projectTokenId: This is an identifier, possibly a token ID, associated with the carbon reduction project. It's used to link the vintage to the specific project it belongs to.

// totalVintageQuantity: This indicates the total quantity of carbon credits generated during this vintage period. It represents the amount of emissions that were reduced, avoided, or offset by the project.

// isCorsiaCompliant: This is a boolean (true/false) value that indicates whether the vintage is compliant with the CORSIA (Carbon Offsetting and Reduction Scheme for International Aviation) standards. CORSIA is an international program designed to offset carbon emissions from the aviation industry.

// isCCPcompliant: Similarly, this is a boolean value indicating whether the vintage is compliant with CCP (Carbon Offsetting and Reduction Scheme for the Chinese Civil Aviation Industry), which is China's equivalent to CORSIA.

// coBenefits: This attribute likely refers to any additional environmental, social, or economic benefits that the carbon reduction project provides beyond just emissions reduction. It could include things like biodiversity protection or community development.

// correspAdjustment: This might involve any adjustments or considerations related to corresponding adjustments between carbon credits and allowances in carbon trading markets.

// additionalCertification: This string field could refer to any additional certifications or validations that the vintage or the project has received from third-party organizations or regulatory bodies.

// uri: Similar to the previous struct, this could be a Uniform Resource Identifier pointing to additional information or documents related to this specific vintage.

// Overall, the VintageData struct appears to capture essential information about a specific vintage of carbon credits within a carbon reduction project. This information is crucial for transparency, accountability, and accurate tracking of emissions reductions and carbon offset activities.
