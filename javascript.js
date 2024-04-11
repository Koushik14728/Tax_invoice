// JavaScript Document



window.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('table');
  const tbody = document.querySelector('#invoice-items');
  const addButton = document.querySelector('#add-row');
  const buyerName = document.querySelector('#buyer-name');
  const buyerAddress = document.querySelector('#buyer-address');
  const grossTotal = document.querySelector('#gross-total');
  const sgst = document.querySelector('#sgst');
  const cgst = document.querySelector('#cgst');
  const totalGST = document.querySelector('#total-gst');
  const netAmount = document.querySelector('#net_amount');


  // Function to calculate total for each row
  function calculateRowTotal(row) {
    const quantity = row.querySelector('input[name="quantity"]').value;
    const price = row.querySelector('input[name="price"]').value;
    const total = row.querySelector('input[name="total"]');
	let discount = row.querySelector('input[name="discount"]').value;
    total.value = (quantity * price).toFixed(2);
	let amount = quantity * price;
	let discountAmount = amount * (discount / 100);
	let discountedAmount = amount - discountAmount;
	total.value = discountedAmount.toFixed(2);
  }

  // Calculate totals for all rows
  function calculateAllTotals() {
    const rows = tbody.querySelectorAll('tr');
    let grossTotalValue = 0;
    rows.forEach(row => {
      calculateRowTotal(row);
      grossTotalValue += parseFloat(row.querySelector('input[name="total"]').value);
    });
    grossTotal.value = grossTotalValue.toFixed(2);
    const totalGSTValue = (grossTotalValue * 0.18).toFixed(2);
    totalGST.value = totalGSTValue;
    const sgstValue = (totalGSTValue / 2).toFixed(2);
    sgst.value = sgstValue;
    cgst.value = sgstValue;
    netAmount.value = (grossTotalValue + parseFloat(totalGSTValue)).toFixed(0);
  }


	
	
	
	
	//------------------------------- add button -------------------------------------------
	
  // Add new row to the table
  function addRow() {
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
      <td><input class="hide" type="number" name="sl_no" min="01" value="1"></td>
      <td><input class="hide" type="text" name="item-name"></td>
      <td><input class="hide" type="text" name="code" placeholder="XXXX"></td>
      <td><input class="hide" type="number" name="quantity" min="1" value="1"></td>
      <td><input class="hide" type="number" name="price" min="0" ></td>
      <td><input class="hide" type="number" name="discount" min="0" value="0"></td>
      <td><input class="hide" type="number" name="total" readonly></td>
      <td class="delete_button"><button class="delete-row">X</button></td>
    `;
    calculateRowTotal(newRow);
    updateDeleteButtons();
    calculateAllTotals();
  }

  // Delete row from table
  function deleteRow(event) {
    const row = event.target.closest('tr');
    row.remove();
    calculateAllTotals();
    updateDeleteButtons();
  }

  // Update "Delete" buttons
  function updateDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-row');
    deleteButtons.forEach(button => {
      button.removeEventListener('click', deleteRow);
      button.addEventListener('click', deleteRow);
    });
  }

  // Event listener for adding a new row
  addButton.addEventListener('click', addRow);

  // Event listener for updating totals when input values change
  table.addEventListener('input', calculateAllTotals);
});

//-----------------------------------------------------------------------------------//

function printPDF() {
	window.print();
}

//--------------------------------------------------------------------------------------- 

window.addEventListener('beforeunload', function (e){
	var message ='Are you want to leave?';
	e.returnValue = message;
});


