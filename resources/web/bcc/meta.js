/*jslint browser: true, white: true, indent: 4, maxerr: 999*/

console.log("meta loaded");

var colors =
[
    "#FAEBD7",
    "#00FFFF",
    "#0000FF",
    "#8A2BE2",
    "#A52A2A",
    "#5F9EA0",
    "#D2691E",
    "#DC143C",
    "#006400",
    "#FF8C00",
    "#FFD700"
];


// This is a keyed structure of tables including the name of the table,
// how it should be displayed, and what fields it has. The type is either
// "Event" for data that does not have a numerical value, so is plotted
// on a timeline as opposed "Value" data that is plotted on a time series.


var table_schema =
{
    Demographics:
    {
        Type: "Demographics",
        TableName: "Demographics",
        DisplayName: "Demographics",
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "Date Of Birth",
                DisplayName: "Date Of Birth"
            },
            {
                FieldName: "Gender",
                DisplayName: "Gender"
            },
            {
                FieldName: "Date Of Death",
                DisplayName: "Date Of Death"
            },
            {
                FieldName: "First Name",
                DisplayName: "First Name"
            },
            {
                FieldName: "Last Name",
                DisplayName: "Last Name"
            }
        ]
    },

    Diagnosis:
    {
        Type: "Event",
        TableName: "Diagnosis",
        DisplayName: "Diagnosis",
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "InitialDiagnosis",
                DisplayName: "Initial Diagnosis"
            },
            {
                FieldName: "HistologyDescription",
                DisplayName: "Histology Description"
            },
            {
                FieldName: "DagnosisFromHistologyCode",
                DisplayName: "Diagnosis form Histology"
            },
            {
                FieldName: "Grade",
                DisplayName: "Grade"
            },
            {
                FieldName: "TumorSize",
                DisplayName: "Tumor Size",
                Units: "mm"
            },
            {
                FieldName: "LymphVascularInvasion",
                DisplayName: "Lymph Vascular Invasion"
            },
            {
                FieldName: "StageGroupingDominant",
                DisplayName: "Stage Grouping Dominant"
            },
            {
                FieldName: "PrimarySiteMajorGroupsForStaging",
                DisplayName: "Primary Site Major Groups For Staging"
            },
            {
                FieldName: "Margins",
                DisplayName: "Margins"
            }
        ]
    },

    Treatments:
    {
        Type: "Event",
        TableName: "Treatments",
        DisplayName: "Treatment",
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "type",
                DisplayName: "Type"
            },
            {
                FieldName: "mostDefSurgicalResDate",
                DisplayName: "Most Definitive Surgical Res Date"
            },
            {
                FieldName: "comment",
                DisplayName: "Comment"
            }
        ]
    },

    OncoLogTreatmentTable:
    {
        Type: "Event",
        TableName: "OncoLogTreatmentTable",
        DisplayName: "OncoLog Treatment",
        Fields:
        [
            {
                FieldName: "Date",
                DisplayName: "Date"
            },
            {
                FieldName: "Type",
                DisplayName: "Type"
            }
        ]
    },

    Procedures:
    {
        Type: "Event",
        TableName: "Procedures",
        DisplayName: "Procedures",
        Marker:
        {
            symbol: "triangle-down",
            color: "#FAEBD7",
            size: 12
        },
        Line:
        {
            color: "black",
            width: 1
        },
        MultiLegendIdCol: "procedure", // When used, this should be one of the fields below.
        MultiLegendMarkers: // Used with MultiLegendIdCol to define specific markers for each legend ID.
        [
            {
                ID: "Blood draw",
                Marker:
                {
                    symbol: "circle",
                    color: "purple",
                    size: 12
                }
            },
            {
                ID: "CT",
                Marker:
                {
                    symbol: "circle-open",
                    color: "black",
                    size: 12
                }
            },
            {
                ID: "Biopsy",
                Marker:
                {
                    symbol: "square",
                    color: "orange",
                    size: 12
                }
            }
        ],
        Fields:
        [
            {
                FieldName:"date",
                DisplayName: "Date"
            },
            {
                FieldName:"procedure",
                DisplayName: "procedure"
            }
        ]
   },

    BloodDrawTable:
    {
        Type: "Event",
        TableName: "BloodDrawTable",
        DisplayName: "Blood Draw",
        Fields:
        [
            {
                FieldName:"Date",
                DisplayName: "Date"
            }
        ]
    },

    SampleTable:
    {
        Type: "Event",
        TableName: "SampleTable",
        DisplayName: "Sample Type",
        Fields:
        [
            {
                FieldName: "Date",
                DisplayName: "Date"
            },
            {
                FieldName: "SamplePrimaryType",
                DisplayName: "Primary Type"
            },
            {
                FieldName: "SampleMatchedType",
                DisplayName: "Matched Type"
            }
        ]
    },

    BiopsyTable:
    {
        Type: "Event",
        TableName: "BiopsyTable",
        DisplayName: "Samples and Procedures",
        Fields:
        [
            {
                FieldName: "Date",
                DisplayName: "Date"
            },
            {
                FieldName: "Type",
                DisplayName: "Type"
            }
        ]
    },

    ImagingTable:
    {
        Type: "Event",
        TableName: "ImagingTable",
        DisplayName: "Image",
        Fields:
        [
            {
                FieldName: "Date",
                DisplayName: "Date"
            },
            {
                FieldName: "Type",
                DisplayName: "Type"
            }
        ]
    },

    // We need to add a filter on "test" to get just CA19-9 values.
    LabResults:
    {
        Type: "Series",
        TableName: "LabResults",
        DisplayName: "CA19-9",
        Units: "U/ml",
        yValueCol: "result", // When used, this should be one of the fields below.
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "result",
                DisplayName: "CA19-9",
                Units: "U/ml"
            }
        ]
    },

    PrimaryTumorSizeTable:
    {
        Type: "Series",
        TableName: "TumorSizeTable",
        DisplayName: "Primary Tumor",
        Units: "mm",
        Fields:
        [
            {
                FieldName: "Date",
                DisplayName: "Date"
            },
            {
                FieldName: "SizeAxis1",
                DisplayName: "Primary Tumor",
                Units: "mm"
            }
        ]
    },

    TumorSize:
    {
        Type: "Series",
        TableName: "TumorSize",
        DisplayName: "Mass Size",
        Units: "mm",
        MultiLegendIdCol: "tumorId", // When used, this should be one of the fields below.
        MultiLegendColorCycle: ["red", "green", "blue", "purple", "orange", "yellow", "brown", "violet"],
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "tumorId",
                DisplayName: "Mass Name",
            },
            {
                FieldName: "sizeAxis1",
                DisplayName: "Tumor Axis 1",
                Units: "mm"
            },
            {
                FieldName: "sizeAxis2",
                DisplayName: "Tumor Axis 2",
                Units: "mm"
            },
            {
                FieldName: "sizeAxis3",
                DisplayName: "Tumor Axis 3",
                Units: "mm"
            }
        ]
    },


    Weight:
    {
        Type: "Series",
        TableName: "Weight",
        DisplayName: "Weight",
        Units: "kg",
        yValueCol: "weight", // When used, this should be one of the fields below.
        Fields:
        [
            {
                FieldName: "date",
                DisplayName: "Date"
            },
            {
                FieldName: "weight",
                DisplayName: "Weight",
                Units: "kg"
            }
        ]
    }
};
