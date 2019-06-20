// event commited
if(event.willCommit) {

	// settings
	var staticPagesCount = 2;
	var dynamicPagesCount = 3;
	
	// new unit number
	var unitsNew = event.value;
	
	// get the current number of pages
	var currentPagesCount = this.numPages;
	
	// previous unit number
	var unitsOld = (currentPagesCount - staticPagesCount) / dynamicPagesCount;
	
	// new number of pages
	var newPagesCount = staticPagesCount + (dynamicPagesCount * unitsNew);
	
	// delete pages if user selected less units than previously
	if (currentPagesCount > newPagesCount) {
		
		this.deletePages(newPagesCount, currentPagesCount - 1);
	} 
	
	// otherwise add pages
	else {
		
		// loop through units
		for (i = unitsOld; i < unitsNew; i++) {
			
			// loop through pages
			for (p = 1; p <= dynamicPagesCount; p++) {
				
				// spawn page
				this.spawnPageFromTemplate('Unit_page_'+p, this.numPages, true, false);
				
				// "REF AD" field name
				var refFieldName = 'P' + ((i*dynamicPagesCount) + staticPagesCount + p -1) + '.Unit_page_' + p + '.REF AD';
				
				replaceFields(refFieldName, 'REF AD' + '_' + i)
			}
		}	
	}
}

// replace all fields with "old_name"
function replaceFields (old_name, new_name){
	
	// field, new field, and its properties
	var field, newField, pg, rect, tf, ts;
	
	// get field
	field = this.getField(old_name);
	
	// if "REF AD" fileld is found
	if(field){
		
		// if its the only field on page
		if(typeof field.page == 'number'){
			
			// reanme field
			renameField(field, new_name);
		} 
		
		// if there is multiple fields on page
		else 
		{						
			var fieldsPerPage = field.page.length;
			
			// loop through indexed fields
			for (z = 0; z < fieldsPerPage; z++) {
				
				// get indexed field
				field = this.getField(old_name + '.' + z);
				
				if(field){
					// reanme field
					renameField(field, new_name);
				}				
			}							
		}					
	}	
}

// rename single field and copy properties
function renameField (field, new_name){

	// get field properties:	
	// page
	pg = field.page;
	// rectangle
	rct = field.rect;
	// font
	tf = field.textFont;
	// size
	ts = field.textSize;

	// remove old field
	this.removeField(field.name);
	
	// add new field
	newField = this.addField(new_name, 'text', pg, rct);
	
	// copy properties
	newField.textFont = tf;
	newField.textSize = ts;	
}
