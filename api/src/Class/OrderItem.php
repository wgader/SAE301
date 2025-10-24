<?php
require_once 'Entity.php';

class OrderItem extends Entity {
    private $id;
    private $order_id;
    private $product_id;
    private $quantity;
    private $unit_price;

    public function __construct($id) {
        $this->id = $id;
    }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "order_id" => $this->order_id,
            "product_id" => $this->product_id,
            "quantity" => $this->quantity,
            "unit_price" => $this->unit_price
        ];
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function getOrderId() {
        return $this->order_id;
    }

    public function setOrderId($order_id) {
        $this->order_id = $order_id;
        return $this;
    }

    public function getProductId() {
        return $this->product_id;
    }

    public function setProductId($product_id) {
        $this->product_id = $product_id;
        return $this;
    }

    public function getQuantity() {
        return $this->quantity;
    }

    public function setQuantity($quantity) {
        $this->quantity = $quantity;
        return $this;
    }

    public function getUnitPrice() {
        return $this->unit_price;
    }

    public function setUnitPrice($unit_price) {
        $this->unit_price = $unit_price;
        return $this;
    }
}
