<?php

  include("banco.php");

  $sql = $_POST["sql"];

  try {
      $conn = new PDO("mysql:host=$servername;dbname=banco", $username, $password);

      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $data = $conn->query($sql);

      echo "Cadastrado com sucesso!";

  }
  catch(PDOException $e){
      echo $e->getMessage();
  }
  
?>