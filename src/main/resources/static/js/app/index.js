$(document).ready(function() {
	
	$("#btnUploadParent").click(function(){
		readHeader("parentFile");
    });
	
	$("#btnUploadChild").click(function(){
		readHeader("childFile");
    });
	
	$("#btnMatchFiles").click(function(){
		uploadBothFile();
    });
	
	
});



function uploadBothFile() {
	var form;
	form = new FormData();
	form.append("uploadparentfile",document.getElementById('upload-parentfile-input').files[0]);
	form.append("uploadchildfile",document.getElementById('upload-childfile-input').files[0]);
	form.append("parentColumn",$('#columnHeaderParent').val());
	form.append("childColumn",$('#columnHeaderChild').val());
	$.ajax({
		url : "/matchFiles",
		type : "POST",
		data: form,
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		cache : false,
		success : function(data) {
			console.log(data);
				        $("#grid").jqGrid({
				            data: data,
				            datatype: "json",
				            colNames: ["Vin","Year"],
				            colModel: [
				                { name: "childData.vin" },
				                { name: "childData.year" }
				            ],
				            cmTemplate: {width: 100, editable: true, editrules: {required: true}, editoptions: {size: 10}},
				            rowNum: 20,
				            rowList: [20, 40, 60],
				            pager: "#pager",
				            gridview: true,
				            caption: "Contacts",
				            rownumbers: true,
				            autoencode: true,
				            height: "100%",
				            subGrid: true,
				            jsonReader: { repeatitems: false },
//				            beforeProcessing: function (data) {
//				                var rows = data.rows, l = rows.length, i, item, subgrids = {};
//				                for (i = 0; i < l; i++) {
//				                    item = rows[i];
//				                    if (item.actionSet) {
//				                        subgrids[item.id] = item.actionSet;
//				                    }
//				                }
//				                data.userdata = subgrids;
//				            },
//				            subGridRowExpanded: function (subgridDivId, rowId) {
//				                var $subgrid = $("<table id='" + subgridDivId + "_t'></table>"),
//				                    pureRowId = $.jgrid.stripPref(mainGridPrefix, rowId),
//				                    subgrids = $(this).jqGrid("getGridParam", "userData");
//				
//				                $subgrid.appendTo("#" + $.jgrid.jqID(subgridDivId));
//				                $subgrid.jqGrid({
//				                    datatype: "local",
//				                    data: subgrids[pureRowId],
//				                    colNames: ["Due Date", "Note"],
//				                    colModel: [
//				                        { name: "actionDueDate", formatter: "date", sorttype: "date" },
//				                        { name: "actionNote" }
//				                    ],
//				                    sortname: "actionDueDate",
//				                    height: "100%",
//				                    rowNum: 10000,
//				                    autoencode: true,
//				                    autowidth: true,
//				                    jsonReader: { repeatitems: false, id: "actionID" },
//				                    gridview: true,
//				                    idPrefix: rowId + "_"
//				                });
//				            }
				        });
					
			
			
						
		},
		error : function() {
			// Handle upload error
			// ...
		}
	});
}	
/**
 * Upload the file sending it via Ajax at the Spring Boot server.
 */
function readHeader(fileType) {
	var form;
	var url;
	if(fileType=="parentFile"){
		form = new FormData();
		var ins = document.getElementById('upload-parentfile-input').files[0];
		form.append("uploadfile",ins)
		form.append("fileType",fileType);
		url="/readHeaderFromFile;"
	}else{
		form = new FormData();
		var ins = document.getElementById('upload-childfile-input').files[0];
		form.append("uploadfile",ins)
		form.append("fileType",fileType);
		url="/readHeaderFromFile;"
	}
	$.ajax({
		url : url,
		type : "POST",
		 data: form,
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		cache : false,
		success : function(data) {
			var options = [];
			options.push('<option>-- Select Column header  --</option>');
			$.each(data, function(i, item) {
				options.push($('<option/>', {
					value : item,
					text : item
				}));
			});
			if(fileType=="parentFile"){
				$('#columnHeaderParent').html(''); // Set the Dropdown as Blank before new Data
				$('#columnHeaderParent').append(options);
			}else{
				$('#columnHeaderChild').html(''); // Set the Dropdown as Blank before new Data
				$('#columnHeaderChild').append(options);
			}
			
		},
		error : function() {
			// Handle upload error
			// ...
		}
	});
} // function uploadFile