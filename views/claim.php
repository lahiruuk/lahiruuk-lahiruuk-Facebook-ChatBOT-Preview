<?php

$conn_oci = oci_connect('hnba_crc', 'hnba_crc', '192.168.10.152:1580/PRODDB2') or die("cant connect");
if (!$conn_oci) {
    $m = oci_error();
    echo $m['message'], "\n";
    print "not connected to Oracle!";
    exit;
} else {
    print "Connected to Oracle!";
    echo "aasfe";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://hnba-bot.herokuapp.com/css/app.css">
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
</head>
<body>
<div class="container" style="">
    <div class="panel panel-head">
        <h1>Vehicle claims</h1>
    </div>
    <div class="panel panel-body">
        <div class="col-sm-12">
            <form class="form-vertical">
                <input class="form-control custom_input" value="Vehicle Number">
                <input type="button" class="btn btn-lg btn-warning" value="Send Number">
                <?php $row = oci_parse($conn_oci, 'select * from crc_policy WHERE pol_no = 11CLN5KCY001772') ?>
            </form>
        </div>
    </div>
</div>
</body>
</html>