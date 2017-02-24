<?php

  include("banco.php");

  $sql = $_POST["sql"];

  try {
      $conn = new PDO("mysql:host=$servername;dbname=banco", $username, $password);

      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
        $data=$conn->prepare($sql);
        $data->execute();
        $results = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);

  }
  catch(PDOException $e){
      echo $e->getMessage();
  }
  
?>