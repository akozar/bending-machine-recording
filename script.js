$(document).ready(function() {

	/*
	Expanding order history
	$("#orderHistory tr").click(function(event){
	event.stopPropagation();
	if ($(this).next().hasClass('order-info')){
	$(this).next().toggle("fast");
	} else {
	var el = $(this)
	.closest('tr')
	.after("<tr class='info order-info'><td colspan='3'>Список списанных материалов:</td></tr>");
	el.next().hide().fadeIn();
	}
	})

	*/
	function delete_cookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	function showTab(numTab) {
		$("#tabMenu").nextAll().hide();
		$($("#tabMenu").nextAll()[numTab]).show();
		delete_cookie('numTab');
		document.cookie = "numTab=" + numTab;
	}

	$("#materialToList").click(function(event) {
		event.preventDefault();
		var sortName = $("#sortPicker option:selected").val();
		var materialType = $("#addMaterialPicker option:selected").val();
		var quantity = $("#quantity").val();
		var currentButton;
		if (quantity && sortName && materialType) {
			currentButton = addMaterial(sortName, materialType, quantity);
			currentButton.find('button').click(function(event) {
				$(this).closest('h3').remove();
			})
		} else {
			console.log('error');
		}
		console.log(sortName, quantity);
	});

	function addMaterial(sortName, materialType, quantity) {
		var measurement = $("#measure").text();
		console.log();
		var appendedButton = $('<h3><span class="label label-default">' + sortName + '  [' + materialType + '] : ' + quantity + ' ' + measurement + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">  ×</span></button></span></h3>');
		$('.material-container').append(appendedButton);
		return appendedButton;
	}
	var numTab = document.cookie.replace(/(?:(?:^|.*;\s*)numTab\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	if (!numTab) {
		showTab(0);
	} else {
		showTab(numTab);
		$("ul li").removeClass("active");
		$($("ul li")[numTab]).addClass("active");
	}
	var numTab;
	$('#tabMenu li a').click(function(event) {
		event.preventDefault();
		numTab = $('#tabMenu li a').index(this);
		$('#tabMenu li ').removeClass('active');
		$(this).parent().addClass('active');
		showTab(numTab);
	});

	function setCookie() {
		document.cookie = "numTab=" + numTab;
	}
	window.addEventListener('beforeunload', setCookie, false);
	window.addEventListener('unload', setCookie, false);
	// on input handler on newMaterialInput
	function disablingHandler() {
		var disabledEl = document.getElementById('materialPicker');
		if (this.value !== '') {
			disabledEl.setAttribute('disabled', 'disabled');
		} else {
			disabledEl.removeAttribute('disabled');
		};
	};
	var el = document.getElementById('newMaterialInput')
	el.addEventListener("input", disablingHandler, false);
	// show image preview
	$("#imgFile").change(function(event) {

		var tmppath = URL.createObjectURL(event.target.files[0]);
		console.log(tmppath);
		$("#imagePreview").fadeIn("fast").attr('src', tmppath);
	});
	// addDevice button handler
	$('#addDevice').click(function() {
		if (confirm('Вы уверены что добавили всю информацию к данному станку?')) {

		} else {
			event.preventDefault();
		}
	})
});
