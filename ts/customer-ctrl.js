"use strict";
// focus customer ID input field on start
/* $(() => {
  $("#txt-id").focus();
}); */
$(window).on("load", function () {
    var regexpCustomerId = /^C[0-9]{3}$/;
    var regexpCustomerName = /^([A-Za-z. ]{3,})+$/;
    var regexpCustomerAddress = /^[A-Za-z .0-9]{3,}$/;
    var form = $("#frm-customer");
    form.on("submit", function (e) {
        var customerIdInput = $("#txt-id").val();
        var customerNameInput = $("#txt-name").val();
        var customerAddressInput = $("#txt-address").val();
        // check input for validation
        if (regexpCustomerId.test(customerIdInput) == false) {
            markInvalid($("#txt-id"));
        }
        else {
            markValid($("#txt-id"));
        }
        if (regexpCustomerName.test(customerNameInput) == false) {
            markInvalid($("#txt-name"));
        }
        else {
            markValid($("#txt-name"));
        }
        if (regexpCustomerAddress.test(customerAddressInput) == false) {
            markInvalid($("#txt-address"));
        }
        else {
            markValid($("#txt-address"));
        }
        // prevent event propergation if any filed is invalid
        if ($(".form-control").filter(".is-invalid").length != 0) {
            $("input.is-invalid").toArray()[0].focus();
            preventSubmit(e);
        }
        else {
            addCustomer(customerIdInput, customerNameInput, customerAddressInput);
            clearInputFields();
        }
    });
});
// trim text of input field on focusout
$("input.form-control").on("focusout", function (e) {
    var inputValue = $(e.target).val();
    var trimedValue = $.trim(inputValue);
    $(e.target).val(trimedValue);
});
var preventSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
};
// mark form fields as invalid
var markInvalid = function (field) {
    field.addClass("is-invalid");
    field.removeClass("is-valid");
};
// mark form fields as valid
var markValid = function (field) {
    field.addClass("is-valid");
    field.removeClass("is-invalid");
};
// clear input fields on data submit
var clearInputFields = function () {
    //   $("input").val("");
    $("input").removeClass("is-valid");
    $("#txt-id").focus();
};
// add customer data to table
var addCustomer = function (id, name, address) {
    $("#tbl-customers>tbody").append("<tr>\n            <td>" + id + "</td>\n            <td>" + name + "</td>\n            <td>" + address + "</td>\n            <td><img src=\"./img/trash.png\" alt=\"trash\" class=\"del-btn\"/></td>\n            \n      </tr>\n      ");
    hideTableFooter();
    checkPaginationState();
};
// remove customer data from table
var removeCustomer = function () {
    showTableFooter();
    checkPaginationState();
};
// hide table footer if there are data in the table
var hideTableFooter = function () {
    if ($("#tbl-customers>tbody>tr").length > 0) {
        $("#tbl-customers>tfoot").hide();
    }
};
// show table footer if there are no data in the table
var showTableFooter = function () {
    if (($("#tbl-customers>tbody>tr").length = 0)) {
        $("#tbl-customers>tfoot").show();
    }
};
// hide pagination
var hidePagination = function () {
    $(".pagination").parent().hide();
};
// show pagination
var showPagination = function () {
    $(".pagination").parent().show();
};
// pagination visibility condition check
var checkPaginationState = function () {
    var tableBottomPoint = $("table").offset().top + $("table").outerHeight();
    var footerTopPoint = $("footer").offset().top;
    var paginationHeight = $(".pagination").parent().height();
    if (footerTopPoint - tableBottomPoint <= paginationHeight + 100) {
        showPagination();
    }
    else {
        hidePagination();
    }
};
$(window).on("resize load", function () {
    checkPaginationState();
});
// highlight active page on pagination
// enable/ disable forward and backward button of the pagination
// add new page to pagination
// remove page from pagination
