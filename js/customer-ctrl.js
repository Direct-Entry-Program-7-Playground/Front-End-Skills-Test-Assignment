"use strict";
// focus customer ID input field on start
/* $(() => {
  $("#txt-id").focus();
}); */
$(window).on("load", () => {
    let regexpCustomerId = /^C[0-9]{3}$/;
    let regexpCustomerName = /^([A-Za-z. ]{3,})+$/;
    let regexpCustomerAddress = /^[A-Za-z .0-9]{3,}$/;
    let form = $("#frm-customer");
    form.on("submit", (e) => {
        let customerIdInput = $("#txt-id").val();
        let customerNameInput = $("#txt-name").val();
        let customerAddressInput = $("#txt-address").val();
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
$("input.form-control").on("focusout", (e) => {
    let inputValue = $(e.target).val();
    let trimedValue = $.trim(inputValue);
    $(e.target).val(trimedValue);
});
let preventSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
// mark form fields as invalid
let markInvalid = (field) => {
    field.addClass("is-invalid");
    field.removeClass("is-valid");
};
// mark form fields as valid
let markValid = (field) => {
    field.addClass("is-valid");
    field.removeClass("is-invalid");
};
// clear input fields on data submit
let clearInputFields = () => {
    //   $("input").val("");
    $("input").removeClass("is-valid");
    $("#txt-id").focus();
};
// add customer data to table
let addCustomer = (id, name, address) => {
    $("#tbl-customers>tbody").append(`<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${address}</td>
            <td><img src="./img/trash.png" alt="trash" class="del-btn"/></td>
            
      </tr>
      `);
    hideTableFooter();
};
// hide table footer if there are data in the table
let hideTableFooter = () => {
    if ($("#tbl-customers>tbody>tr").length > 0) {
        $("#tbl-customers>tfoot").hide();
    }
};
// show table footer if there are no data in the table
let showTableFooter = () => {
    if (($("#tbl-customers>tbody>tr").length = 0)) {
        $("#tbl-customers>tfoot").show();
    }
};
// hide pagination
// show pagination
// highlight active page on pagination
// enable/ disable forward and backward button of the pagination
// add new page to pagination
// remove page from pagination
