const url = 'server.php';
window.onload = read();


function modal_window()
{
  let name = document.getElementById('name').value;
  let number = document.getElementById('number').value;
  let option = document.getElementById('option').value;
  if(!isEmpty(name) && !isEmpty(number) && !isNaN(number))
  {
    let params = 'command=client&&name=' + name +'&&num=' + number + '&&opt=' + option;
    ajaxPost(url, params).then(resolve =>
    {
      alert(resolve);
      return;
    }).catch(reject =>
    {
      alert("Ошибка добавления заказа");
      console.log(reject);
      return;
    })
  }
  else
  {
    alert("Вы не заполнили все поля!");
    return;
  }
}

function read()
{
  let params = 'command=read';
  ajaxPost(url, params).then(resolve =>
  {
    resolve = JSON.parse(resolve);
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = ' ';
    let select = document.getElementById('option');
    select.innerHTML = ' ';
    for(let i = 0; i < resolve.length / 4; i++)
    {
      let tr = document.createElement('tr');
      tr.innerHTML = '<th>' + resolve[(i * 4) + 1] + '</th><th>' + resolve[(i * 4) + 2] + '</th><th>' + resolve[(i * 4) + 3] + '</th>';
      tbody.appendChild(tr);
      let option = document.createElement('option');
      option.innerHTML = resolve[(i * 4) + 1];
      select.appendChild(option);

    }
  }).catch(reject =>
  {
    alert("Ошибка работы сервера");
    console.log(reject);
  })
}


function ajaxPost(url, params)
{
	return new Promise(function(resolve, reject)
	{
		var request = new XMLHttpRequest;
		request.open('POST',url,true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		request.addEventListener("load", function()
		{
			if(request.status < 400)
			{
				resolve(request.responseText);
			}
			else
			{
				reject(Error("Ошибка получения данных"));
			}
		});
		request.send(params);
	});
}

function isEmpty(str) // проверка на пустоту
{
  if(str.trim() == '')
    return true;
  return false;
}
