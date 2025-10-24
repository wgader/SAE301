<?php
require_once "src/Repository/EntityRepository.php";
require_once "src/Class/Order.php";
require_once "src/Class/OrderItem.php";

class OrderRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($id) {
        $requete = $this->cnx->prepare("SELECT * FROM `Order` WHERE id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if ($answer == false) return null;
        
        $o = new Order($answer->id);
        $o->setUserId($answer->user_id);
        $o->setTotal($answer->total);
        $o->setStatus($answer->status);
        $o->setCreatedAt($answer->created_at);
        return $o;
    }

    public function findAll() {
        $requete = $this->cnx->prepare("SELECT * FROM `Order`");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answer as $obj) {
            $o = new Order($obj->id);
            $o->setUserId($obj->user_id);
            $o->setTotal($obj->total);
            $o->setStatus($obj->status);
            $o->setCreatedAt($obj->created_at);
            $res[] = $o;
        }
        return $res;
    }

    public function findByUserId($userId) {
        $requete = $this->cnx->prepare("SELECT * FROM `Order` WHERE user_id=:userId ORDER BY created_at DESC");
        $requete->bindParam(':userId', $userId);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answer as $obj) {
            $o = new Order($obj->id);
            $o->setUserId($obj->user_id);
            $o->setTotal($obj->total);
            $o->setStatus($obj->status);
            $o->setCreatedAt($obj->created_at);
            $res[] = $o;
        }
        return $res;
    }

    public function save($order) {
        $requete = $this->cnx->prepare(
            "INSERT INTO `Order` (user_id, total, status) VALUES (:user_id, :total, :status)"
        );
        $user_id = $order->getUserId();
        $total = $order->getTotal();
        $status = $order->getStatus();
        $requete->bindParam(':user_id', $user_id);
        $requete->bindParam(':total', $total);
        $requete->bindParam(':status', $status);
        $answer = $requete->execute();
        if ($answer) {
            $id = $this->cnx->lastInsertId();
            $order->setId($id);
            return true;
        }
        return false;
    }

    public function delete($id) {
        $requete = $this->cnx->prepare("DELETE FROM `Order` WHERE id=:value");
        $requete->bindParam(':value', $id);
        return $requete->execute();
    }

    public function update($entity) {
        $requete = $this->cnx->prepare(
            "UPDATE `Order` SET status=:status WHERE id=:id"
        );
        $id = $entity->getId();
        $status = $entity->getStatus();
        $requete->bindParam(':id', $id);
        $requete->bindParam(':status', $status);
        return $requete->execute();
    }

    public function findOrderItems($orderId) {
        $requete = $this->cnx->prepare("SELECT * FROM OrderItem WHERE order_id=:orderId");
        $requete->bindParam(':orderId', $orderId);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answer as $obj) {
            $item = new OrderItem($obj->id);
            $item->setOrderId($obj->order_id);
            $item->setProductId($obj->product_id);
            $item->setQuantity($obj->quantity);
            $item->setUnitPrice($obj->unit_price);
            $res[] = $item;
        }
        return $res;
    }

    public function saveOrderItem($orderItem) {
        $requete = $this->cnx->prepare(
            "INSERT INTO OrderItem (order_id, product_id, quantity, unit_price) VALUES (:order_id, :product_id, :quantity, :unit_price)"
        );
        $order_id = $orderItem->getOrderId();
        $product_id = $orderItem->getProductId();
        $quantity = $orderItem->getQuantity();
        $unit_price = $orderItem->getUnitPrice();
        $requete->bindParam(':order_id', $order_id);
        $requete->bindParam(':product_id', $product_id);
        $requete->bindParam(':quantity', $quantity);
        $requete->bindParam(':unit_price', $unit_price);
        return $requete->execute();
    }
}
