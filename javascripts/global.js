$(function(){
	
	$('#toggle_controller').click(function() {
	    $('#controllertabs').toggle(400);
	    return false;
	  });	
	
	$("#fieldsmenu").accordion();
	
	$("#controllertabs").tabs();
	
	$("#formelement").sortable({
			axis: "y",
			cursor: "move"
		});

	$( "#view_code" ).button({
            icons: {
                primary: 'ui-icon-custom'}
		});

	$("#viewformcontainer").resizable({
			minWidth: 560,
			stop: function(event, ui) {       
        		$(ui.element).height('auto');
    		}			
		});	
		
	$('.btnDelete').live('click', function(){
        $('#field_' + $(this).attr('id')).remove();
      });

	/* When click on 'make unique' then add validatesUniquenessOf to model init */
	$('.chkUnique').live('click', function(){
		var text = $('#txtTextProperty_' + $(this).attr('id')).val();
		var array = $('.src_unique').html().split(","); // split into an Array

		if ($('#' +  $(this).attr('id')).is(':checked')) { 
			if ( $(".src_unique").text() == "") {
				$('#validatesUniquenessOf').show();
				$('.src_unique').html(text);
			}
			else{
				$('.src_unique').append("," + text);
			}		
		} else {
			while(array.indexOf(text) > -1) {         // as long as text is in the array...
			    array.splice(array.indexOf(text), 1); // remove one element from the array
			                                          // at the position the text is
			}
			$('.src_unique').html(array.join(","));
			  					
			if ( $(".src_unique").text() == "") {
				$('#validatesUniquenessOf').hide();
			}
		}
	});

	$('#objectname').live('change', function(){
		$(".src_objectname").html($("#objectname").attr('value'));
		$("#inputcontroller").attr('value', $("#objectname").attr('value') + 's');		
		$(".src_viewformcontroller").html($("#objectname").attr('value') + 's');
		$(".src_formcontroller").html($("#objectname").attr('value') + "s.cfc");
		$(".src_formmodel").html($("#objectname").attr('value') + ".cfc");
	});

	$('#inputcontroller').live('change', function(){
		$("#src_viewformcontroller").html($("#inputcontroller").attr('value'));
		$(".src_formcontroller").html($("#inputcontroller").attr('value') + ".cfc");
	});

	$("#pagename").change(function(){
		$("#src_viewpagename").html("/" + $("#pagename").attr('value') + ".cfm");
		$(".src_pagename").html($("#pagename").attr('value'));	

		var $radios = $('input:radio[name=pagetype]');
		if ($("#pagename").attr('value') == 'new'){
			$radios.filter('[value=new]').attr('checked', true);
			$(".src_pagetype").html('.new()');
		}
		if ($("#pagename").attr('value') == 'edit'){
			$radios.filter('[value=edit]').attr('checked', true);
			$(".src_pagetype").html('.findByKey(params.key)');
		}
	});

	$(".pagetype").change(function(){
		if ($("input[@name='pagetype']:checked").val() == 'new'){
			$(".src_pagetype").html('.new()');
		}
		else{
			$(".src_pagetype").html('.findByKey(params.key)');
		}
	});

	$("#formaction").change(function(){
		$(".src_formaction").html($("#formaction").attr('value'));	
	});

	/* on click to add imageTag */
	$("#imageTag").click(function() { 
		var i = ($('p.fields').length);
	   	$('<p class="fields" id="field_' + i + '">#imageTag(source="<span id="imageSource_' + i + '"></span><input type="text" class="input" class="input" id="txtImageSource_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
	  
	 	$("#txtImageSource_" + i).live('keyup', function(){
	        $('#imageSource_' + i).html($(this).val());
		    });	  
	});		

	/* on click to add text input */
	$("#textField,#textFieldTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'textField'){
			$('<p class="fields" id="field_' + i + '">#textField(objectName="<span class="src_objectname">' + $("#objectname").attr('value') +  '</span>", property="<span id="textProperty_' + i + '"></span><input type="text" class="input" id="txtTextProperty_' + i + '"/>", label="<span id="textLabel_' + i + '"></span><input type="text" class="input" id="txtTextLabel_' + i + '"/>")#<span class="input"><br/>Unique <input type="checkbox" class="chkUnique" id="' + i + '"> <a href="javascript:void(0)" class="input" id="help_unique" class="helplink">?</a><br/></span> <span class="input">defaultValue <input type="text" class="input" id="txtTextValue_' + i + '"/></span><input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);	
		}
		else if ($(this).attr('id') == 'textFieldTag'){
			$('<p class="fields" id="field_' + i + '">#textFieldTag(name="<span id="textProperty_' + i + '"></span><input type="text" class="input" id="txtTextProperty_' + i + '"/>", label="<span id="textLabel_' + i + '"></span><input type="text" class="input" id="txtTextLabel_' + i + '"/>"), value="<span id="textValue_' + i + '"></span><input type="text" class="input" id="txtTextValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);			
		}

	 	$("#txtTextProperty_" + i).live('keyup', function(){
	        $('#textProperty_' + i).html($(this).val());
	    });
			
	 	$("#txtTextLabel_" + i).live('keyup', function(){
	        $('#textLabel_' + i).html($(this).val());
	    });	  				  

	 	$("#txtTextValue_" + i).live('keyup', function(){
	        $('#textValue_' + i).html($(this).val());
	    });	  	

	 	$("#txtTextValue_" + i).live('change', function(){
			if ($(this).val() == ''){
				$('#defaultvalue_' + i).hide();				
			}
			else{
				var defaultValue = '<div id="defaultvalue_' + i + '"><span class="tagcolor">&lt;cfset property</span>(name="' + $('#txtTextProperty_' + i).val() + '" defaultValue="' + $(this).val() + '" )<span class="tagcolor">&gt;</span></div></div>';
				$(defaultValue).appendTo('#defaultValue');
			}
	    });	  	
	});		
	
	/* on click to add hidden */
	$("#hiddenField,#hiddenFieldTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'hiddenField') {
			$('<p class="fields" id="field_' + i + '">#hiddenField(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="hiddenProperty_' + i + '"></span><input type="text" class="input" id="txtHiddenProperty_' + i + '"/>", label="<span id="hiddenLabel_' + i + '"></span><input type="text" class="input" id="txtHiddenLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		else if ($(this).attr('id') == 'hiddenFieldTag') {
			$('<p class="fields" id="field_' + i + '">#hiddenFieldTag(name="<span id="hiddenProperty_' + i + '"></span><input type="text" class="input" id="txtHiddenProperty_' + i + '"/>", label="<span id="hiddenLabel_' + i + '"></span><input type="text" class="input" id="txtHiddenLabel_' + i + '"/>"), value="<span id="hiddenValue_' + i + '"></span><input type="text" class="input" id="txtHiddenValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);			
		}	  
	  
	 	$("#txtHiddenProperty_" + i).live('keyup', function(){
	        $('#hiddenProperty_' + i).html($(this).val());
	    });
			
	 	$("#txtHiddenLabel_" + i).live('keyup', function(){
	        $('#hiddenLabel_' + i).html($(this).val());
	    });	  				  

	 	$("#txtHiddenValue_" + i).live('keyup', function(){
	        $('#hiddenValue_' + i).html($(this).val());
	    });	
	});		
		
	/* on click to add password input */
	$("#passwordField,#passwordFieldTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'passwordField') {
			$('<p class="fields" id="field_' + i + '">#passwordField(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="passwordProperty_' + i + '"></span><input type="text" class="input" id="txtPasswordProperty_' + i + '"/>", label="<span id="passwordLabel_' + i + '"></span><input type="text" class="input" id="txtPasswordLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		else if ($(this).attr('id') == 'passwordFieldTag') {
			$('<p class="fields" id="field_' + i + '">#passwordFieldTag(name="<span id="passwordProperty_' + i + '"></span><input type="text" class="input" id="txtPasswordProperty_' + i + '"/>", label="<span id="passwordLabel_' + i + '"></span><input type="text" class="input" id="txtPasswordLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
	  
	 	$("#txtPasswordProperty_" + i).live('keyup', function(){
	        $('#passwordProperty_' + i).html($(this).val());
	    });	

	 	$("#txtPasswordLabel_" + i).live('keyup', function(){
	        $('#passwordLabel_' + i).html($(this).val());
	    });	 			
	});			
	
	/* on click to add textarea */
	$("#textArea,#textAreaTag").click(function() { 
		var i = ($('p.fields').length);

		if ($(this).attr('id') == 'textArea') {
			$('<p class="fields" id="field_' + i + '">#textArea(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="textareaProperty_' + i + '"></span><input type="text" class="input" id="txtTextareaProperty_' + i + '"/>", label="<span id="textareaLabel_' + i + '"></span><input type="text" class="input" id="txtTextareaLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		else if ($(this).attr('id') == 'textAreaTag') {
			$('<p class="fields" id="field_' + i + '">#textAreaTag(name="<span id="textareaProperty_' + i + '"></span><input type="text" class="input" id="txtTextareaProperty_' + i + '"/>", label="<span id="textareaLabel_' + i + '"></span><input type="text" class="input" id="txtTextareaLabel_' + i + '"/>"), value="<span id="textareaValue_' + i + '"></span><input type="text" class="input" id="txtTextareaValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);			
		}
	  
	 	$("#txtTextareaProperty_" + i).live('keyup', function(){
	        $('#textareaProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtTextareaLabel_" + i).live('keyup', function(){
	        $('#textareaLabel_' + i).html($(this).val());
	    });	  

	 	$("#txtTextareaValue_" + i).live('keyup', function(){
	        $('#textareaValue_' + i).html($(this).val());
	    });	 
	});	

	/* on click to add radio button */
	$("#radioButton,#radioButtonTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'radioButton') {
			$('<p class="fields" id="field_' + i + '">#radioButton(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="radioProperty_' + i + '"></span><input type="text" class="input" id="txtRadioProperty_' + i + '"/>", label="<span id="radioLabel_' + i + '"></span><input type="text" class="input" id="txtRadioLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		else if ($(this).attr('id') == 'radioButtonTag') {
			$('<p class="fields" id="field_' + i + '">#radioButtonTag(name="<span id="radioProperty_' + i + '"></span><input type="text" class="input" id="txtRadioProperty_' + i + '"/>", label="<span id="radioLabel_' + i + '"></span><input type="text" class="input" id="txtRadioLabel_' + i + '"/>"), value="<span id="radioValue_' + i + '"></span><input type="text" class="input" id="txtRadioValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
				
	 	$("#txtRadioProperty_" + i).live('keyup', function(){
	        $('#radioProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtRadioLabel_" + i).live('keyup', function(){
	        $('#radioLabel_' + i).html($(this).val());
	    });	 

	 	$("#txtRadioValue_" + i).live('keyup', function(){
	        $('#radioValue_' + i).html($(this).val());
	    });	 
	});	

	/* on click to add radio button */
	$("#checkBox,#checkBoxTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'checkBox') {
			$('<p class="fields" id="field_' + i + '">#checkBox(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="checkboxProperty_' + i + '"></span><input type="text" class="input" id="txtCheckboxProperty_' + i + '"/>", label="<span id="checkboxLabel_' + i + '"></span><input type="text" class="input" id="txtCheckboxLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		else if ($(this).attr('id') == 'checkBoxTag') {
			$('<p class="fields" id="field_' + i + '">#checkBoxTag(name="<span id="checkboxProperty_' + i + '"></span><input type="text" class="input" id="txtCheckboxProperty_' + i + '"/>", label="<span id="checkboxLabel_' + i + '"></span><input type="text" class="input" id="txtCheckboxLabel_' + i + '"/>"), value="<span id="checkboxValue_' + i + '"></span><input type="text" class="input" id="txtCheckboxValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);			
		}		  
	  
	 	$("#txtCheckboxProperty_" + i).live('keyup', function(){
	        $('#checkboxProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtCheckboxLabel_" + i).live('keyup', function(){
	        $('#checkboxLabel_' + i).html($(this).val());
	    });	  

	 	$("#txtCheckboxValue_" + i).live('keyup', function(){
	        $('#checkboxValue_' + i).html($(this).val());
	    });	  
	});	

	/* on click to add radio button */
	$("#select,#selectTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'select') {
			$('<p class="fields" id="field_' + i + '">#select(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="selectProperty_' + i + '"></span><input type="text" class="input" id="txtSelectProperty_' + i + '"/>", options="<span id="selectOptions_' + i + '"></span><input type="text" class="input" id="txtSelectOptions_' + i + '"/>", label="<span id="selectLabel_' + i + '"></span><input type="text" class="input" id="txtSelectLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}

		else if ($(this).attr('id') == 'selectTag') {
			$('<p class="fields" id="field_' + i + '">#selectTag(name="<span id="selectProperty_' + i + '"></span><input type="text" class="input" id="txtSelectProperty_' + i + '"/>", options="<span id="selectOptions_' + i + '"></span><input type="text" class="input" id="txtSelectOptions_' + i + '"/>", label="<span id="selectLabel_' + i + '"></span><input type="text" class="input" id="txtSelectLabel_' + i + '"/>", valueField="<span id="selectValueField_' + i + '"></span><input type="text" class="input" id="txtSelectValueField_' + i + '"/>", textField="<span id="selectTextField_' + i + '"></span><input type="text" class="input" id="txtSelectTextField_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
			  
	 	$("#txtSelectProperty_" + i).live('keyup', function(){
	        $('#selectProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtSelectOptions_" + i).live('keyup', function(){
	        $('#selectOptions_' + i).html($(this).val());
	    });	  

	 	$("#txtSelectLabel_" + i).live('keyup', function(){
	        $('#selectLabel_' + i).html($(this).val());
	    });	  

	 	$("#txtSelectValueField_" + i).live('keyup', function(){
	        $('#selectValueField_' + i).html($(this).val());
	    });	  

	 	$("#txtSelectTextField_" + i).live('keyup', function(){
	        $('#selectTextField_' + i).html($(this).val());
	    });	  			
	});	
	
	/* on click to add file */
	$("#fileField,#fileFieldTag").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'fileField') {
			$('<p class="fields" id="field_' + i + '">#fileField(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="fileProperty_' + i + '"></span><input type="text" class="input" id="txtFileProperty_' + i + '"/>", label="<span id="fileLabel_' + i + '"></span><input type="text" class="input" id="txtFileLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
		
		else if ($(this).attr('id') == 'fileFieldTag') {
			$('<p class="fields" id="field_' + i + '">#fileFieldTag(name="<span id="fileProperty_' + i + '"></span><input type="text" class="input" id="txtFileProperty_' + i + '"/>", label="<span id="fileLabel_' + i + '"></span><input type="text" class="input" id="txtFileLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
	  
	 	$("#txtFileProperty_" + i).live('keyup', function(){
	        $('#fileProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtFileLabel_" + i).live('keyup', function(){
	        $('#fileLabel_' + i).html($(this).val());
	    });	  
	});		

	/* on click to add file */
	$("#dateSelect,#dateSelectTags").click(function() { 
		var i = ($('p.fields').length);
		
		if ($(this).attr('id') == 'dateSelect') {
			$('<p class="fields" id="field_' + i + '">#dateSelect(objectName="<span class="src_objectname">' + $("#objectname").attr('value') + '</span>", property="<span id="datepickerProperty_' + i + '"></span><input type="text" class="input" id="txtDatepickerProperty_' + i + '"/>", label="<span id="datepickerLabel_' + i + '"></span><input type="text" class="input" id="txtDatepickerLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}

		if ($(this).attr('id') == 'dateSelectTags') {
			$('<p class="fields" id="field_' + i + '">#dateSelectTag(name="<span id="datepickerProperty_' + i + '"></span><input type="text" class="input" id="txtDatepickerProperty_' + i + '"/>", label="<span id="datepickerLabel_' + i + '"></span><input type="text" class="input" id="txtDatepickerLabel_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
		}
	  
	 	$("#txtDatepickerProperty_" + i).live('keyup', function(){
	        $('#datepickerProperty_' + i).html($(this).val());
	    });	  

	 	$("#txtDatepickerLabel_" + i).live('keyup', function(){
	        $('#datepickerLabel_' + i).html($(this).val());
	    });	  
	});	

	/* on click to add submit button */
	$("#add_submit").click(function() { 
		var i = ($('p.fields').length);
		$('<p class="fields" id="field_' + i + '">#submitTag(value="<span id="submitValue_' + i + '"></span><input type="text" class="input" id="txtSubmitValue_' + i + '"/>")#<input type="button" value="x" class="input btnDelete" id="' + i + '"></p>').appendTo('#formelement').show("highlight", {}, 3000);
	  
	 	$("#txtSubmitValue_" + i).live('keyup', function(){
	        $('#submitValue_' + i).html($(this).val());
	    });	  
	});	

	/*	DIALOG BOX	*/

	$('#help_unique').live('click', function(){
		$( "#dialog_unique" ).dialog({
			modal: true,
			buttons: {
				Ok: function(){
					$(this).dialog("close");
				}
			}					
		});	
	});
			
	$('#help_pagename').live('click', function(){
		$( "#dialog_pagename" ).dialog({
			modal: true,
			buttons: {
				Ok: function(){
					$(this).dialog("close");
				}
			}					
		});	
	});
			  
	$('#view_code').click(function(){

		$('#copyviewform').html("");
		$('#viewform').clone().appendTo('#copyviewform');
		$('#copyviewform p').removeClass('fields');
		$('#copyviewform .input').remove();

		$( "#dialog_view_source" ).dialog({
			height: 600,
			width: 600,
			modal: true,
			buttons: {
				Ok: function(){
					$(this).dialog("close");
				}
			}					
		});		
    });
});