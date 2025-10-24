<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'src/Class/Entity.php';
require_once 'src/Class/Order.php';
require_once 'src/Class/OrderItem.php';

echo "Test Order...\n";
$o = new Order(1);
$o->setUserId(6);
$o->setTotal(150);
$o->setStatus('En Cours');
echo "Order créé OK\n";

echo "Test OrderItem...\n";
$item = new OrderItem(1);
$item->setOrderId(1);
$item->setProductId(32);
$item->setQuantity(1);
$item->setUnitPrice(150);
echo "OrderItem créé OK\n";

echo "Test jsonSerialize...\n";
$json = json_encode($o);
echo "JSON: " . $json . "\n";

echo "TOUT OK!\n";
