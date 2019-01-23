<?php
  include('bd.php');

  switch ($_POST['command'])
  {
    case 'read':
      $result = mysql_query("SELECT * FROM purch", $db);
      $r = array();
      while($res = mysql_fetch_array($result))
      {
        array_push($r, $res['id'], $res['name'], $res['date_r'], $res['cost']);
      }
      echo json_encode($r);
      break;
    case 'client':
      $name = $_POST['name'];
      $num = $_POST['num'];
      $opt = $_POST['opt'];
      $result = mysql_query("INSERT INTO client (name, num, opt) VALUES ('$name', '$num', '$opt')", $db);
      echo 'Ваш заказ успешно добавлен, ожидайте звонка!';
      break;
    case 'read_client':
      $result = mysql_query("SELECT * FROM client", $db);
      $r = array();
      while($res=mysql_fetch_array($result))
      {
        array_push($r, $res['id'], $res['name'], $res['num'], $res['opt']);
      }
      echo json_encode($r);
      break;
    case 'close':
      $id = $_POST['id'];
      $result = mysql_query("DELETE FROM client WHERE id='$id'", $db);
      echo 'База данных обновлена!';
      break;
    case 'del':
      $id = $_POST['id'];
      $result = mysql_query("DELETE FROM purch WHERE id='$id'", $db);
      echo 'База данных обновлена!';
      break;
    case 'add':
      $name = $_POST['name'];
      $cost = $_POST['cost'];
      $time = $_POST['time'];
      $result = mysql_query("INSERT INTO purch (name, date_r, cost) VALUES ('$name', '$time' , '$cost')", $db);
      echo 'База данных обновлена!';
      break;
  }


 ?>
