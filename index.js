
//thank code from https://www.thaicreate.com/php/forum/059395.html
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    x1 + x2;

    return x1 + x2;
}

//develop by ME
async function renderTable(){
    try{
    let table = document.getElementById("notebook-table-list");
    let respon = await fetch('./assets/json/notebooklist.json');
    let data = await respon.json();
    var table_row = "";

    console.log(data);

    //สร้างแถวของข้อมูล รายการ notebook
    for(row in data['data']){

        table_row += "<tr class='table-row'>";
            table_row += '<td class="td-table text-left">'+data['data'][row]['notebook_name']+'</td>';
            table_row += '<td class="td-table text-left">'+data['data'][row]['cpu']+'</td>';
            table_row += '<td class="td-table text-left">'+data['data'][row]['gpu']+'</td>';
            table_row += '<td class="td-table text-center">'+data['data'][row]['ram']+'</td>';
            table_row += '<td class="td-table text-center">'+addCommas(data['data'][row]['price'].toString())+'</td>';
            table_row += '<td class="td-table">';
                table_row += '<img class="mx-auto w-50" src="'+data['data'][row]['image']+'">';
            table_row +=`</td>`;
        table_row +="</tr>";
    }

    //แสดงผลข้อมูลในตาราง
    table.innerHTML += table_row;
    console.log(table_row);

    //แสดง timestamp
    let timestamp = document.getElementById("timestamp");
    let date = new Date(data['timestamp_update']);
    timestamp.innerHTML = "อัพเดทล่าสุดเมื่อ: "+date.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    }catch(err){
        console.log(err);
    }
}