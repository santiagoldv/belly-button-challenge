
// URL -> constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// JSON data and console log
d3.json(url).then(function(data){console.log(data)});

// First subject data extraction for charts
d3.json(url).then(function(data){let subjectID = data.names[0];
    initialChart(subjectID)
});

// Dropdown conection to charts
function initialChart(subjectID){
    d3.json(url).then(function(data){
        let subjectSelector = d3.select("#selDataset");
        let subjectNames = data.names;
        subjectNames.forEach(function(subjectName){
            subjectSelector.append("option").text(subjectName);
        })    
        barChart(subjectID);
        bubbleChart(subjectID);
        demoInfo(subjectID);
    })
};

// Function barchart
function barChart(subjectID){
    d3.json(url).then(function(data){
        let subjectData = data.samples.filter(x => x.id == subjectID);
        let barData = [{
            x: subjectData[0].sample_values.slice(0,10).reverse(),
            y: subjectData[0].otu_ids.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: "green"
            },
            text: subjectData[0].otu_labels.slice(0,10).reverse()
        }];
        let barLayout = {title: "Top 10 OTUs",
            height: 500,
            width: 600,
            yaxis: {title: "OTU", type: "category"},
        }
        Plotly.newPlot("bar", barData, barLayout)
    })
};

// Function bubble chart
function bubbleChart(subjectID){
    d3.json(url).then(function(data){
        let subjectData = data.samples.filter(x => x.id == subjectID);
        let bubbleData = [{
            x: subjectData[0].otu_ids,
            y: subjectData[0].sample_values,
            text: subjectData[0].otu_labels,
            mode: "markers",
            marker : {
                color: subjectData[0].otu_ids,
                colorscale: "Earth",
                size: subjectData[0].sample_values
            }
        }];
        let bubbleLayout = {
            title: "ID bacterias",
            showlegend : false,
            height: 600,
            width: 900
          };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    })
};

//Function demo information
function demoInfo(subjectID){
    d3.json(url).then(function(data){
        let subjectData = data.metadata.filter(x => x.id == subjectID);
        const sampleMetadata = document.getElementById("sample-metadata");
        sampleMetadata.innerHTML = `Test Subject ID: ${String(subjectData[0].id)} 
        <br>Ethnicity: ${subjectData[0].ethnicity}
        <br>Gender: ${subjectData[0].gender}
        <br>Age: ${subjectData[0].age}
        <br>Location: ${subjectData[0].location}
        <br>bbtype: ${subjectData[0].bbtype}
        <br>wfreq: ${subjectData[0].wfreq}`
    })
};

// Function to change dashboard when changing ID
function optionChanged(subjectID){
    barChart(subjectID);
    bubbleChart(subjectID);
    demoInfo(subjectID);
};