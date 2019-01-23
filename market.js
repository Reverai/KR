const url = 'server.php';
window.onload = read();


function modal_window()
{
  let name = document.getElementById('name').value;
  let time = document.getElementById('time').value;
  let cost = document.getElementById('cost').value;
  if(!isEmpty(name) && !isEmpty(time) && !isEmpty(cost) && !isNaN(cost))
  {
    let params = 'command=add&&name=' + name + '&&time=' + time + '&&cost=' + cost;
    ajaxPost(url, params).then(resolve =>
    {
      alert(resolve);
      second_read();
      return;
    }).catch(reject =>
    {
      alert("Ошибка обновления БД");
      console.log(reject);
      return;
    })
  }
  else
  {
    alert("Неправильно заполнены данные");
    return;
  }
}




function read()
{
  let params = 'command=read_client';
  second_read();
  ajaxPost(url, params).then(resolve =>
  {
    resolve = JSON.parse(resolve);
    let main = document.getElementById("main");
    main.innerHTML = " ";
    for(let i = 0; i < resolve.length / 4; i++)
    {
      let tr = document.createElement('tr');
      tr.innerHTML = "<th>" + resolve[(i * 4) + 1] + "</th><th>" + resolve[(i * 4) + 2] + '</th><th>' + resolve[(i * 4) + 3] + '</th>';
      tr.onclick = () =>
      {
        let answer = confirm("Вы желаете закрыть этот заказ?");
        if(answer)
        {
          let params = 'command=close&&id=' + resolve[(i * 4)];
          ajaxPost(url,params).then(resolve =>
          {
            alert(resolve);
            read();
            return;
          }).catch(reject =>
          {
            alert("Ошибка обновления БД");
            console.log(reject);
            return;
          })
        }
        else
        {
          return;
        }
      };
      main.appendChild(tr);
    }
  }).catch(reject =>
  {
    alert("Ошибка работы сервера");
    console.log(reject);
  })
}

function second_read()
{
  let params = 'command=read';
  ajaxPost(url, params).then(resolve =>
  {
    resolve = JSON.parse(resolve);
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    for(let i = 0; i < resolve.length / 4; i++)
    {
      let tr = document.createElement('tr');
      tr.innerHTML = '<th>' + resolve[(i * 4) + 1] + '</th><th>' + resolve[(i * 4) + 2] + '</th><th>' + resolve[(i * 4) + 3] + '</th>';
      tr.onclick = () =>
      {
        let answer = confirm("Вы желаете удалить эту услугу?");
        if(answer)
        {
          let params = 'command=del&&id='+resolve[(i * 4)];
          ajaxPost(url, params).then(resolve =>
          {
            alert(resolve);
            second_read();
            return;
          }).catch(reject =>
          {
            alert("Ошибка обновления БД");
            console.log(reject);
            return;
          });
        }
        else
        {
          return;
        }
      };
      tbody.appendChild(tr);
    }
  }).catch(reject =>
  {
    alert("Ошибка работы сервера");
    console.log(reject);
    return;
  });
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
