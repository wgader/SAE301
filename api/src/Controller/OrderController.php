<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/OrderRepository.php";
require_once "src/Class/Order.php";
require_once "src/Class/OrderItem.php";

class OrderController extends EntityController {

    private $orders;

    public function __construct() {
        $this->orders = new OrderRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId();
        $userId = $request->getParam('user_id');

        if ($id) {
            $order = $this->orders->find($id);
            if ($order == null) return false;
            
            $items = $this->orders->findOrderItems($id);
            $orderData = $order->jsonSerialize();
            $orderData['items'] = $items;
            return $orderData;
        }
        
        if ($userId) {
            return $this->orders->findByUserId($userId);
        }
        
        return $this->orders->findAll();
    }

    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $data = json_decode($json);
        
        if (!$data) {
            http_response_code(400);
            return ['error' => 'Données JSON invalides'];
        }
        
        $userId = $data->user_id ?? null;
        $total = $data->total ?? null;
        $items = $data->items ?? null;

        if (!$userId || !$total || !$items || !is_array($items)) {
            http_response_code(400);
            return ['error' => 'Tous les champs sont obligatoires'];
        }

        $o = new Order(0);
        $o->setUserId($userId);
        $o->setTotal($total);
        $o->setStatus('En Cours');

        $ok = $this->orders->save($o);
        
        if (!$ok) {
            http_response_code(500);
            return ['error' => 'Erreur lors de la création de la commande'];
        }

        foreach ($items as $itemData) {
            $item = new OrderItem(0);
            $item->setOrderId($o->getId());
            $item->setProductId($itemData->product_id);
            $item->setQuantity($itemData->quantity);
            $item->setUnitPrice($itemData->unit_price);
            $this->orders->saveOrderItem($item);
        }

        return $o;
    }

    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        
        if (!$id) {
            http_response_code(400);
            return ['error' => 'ID requis'];
        }

        $ok = $this->orders->delete($id);
        
        if (!$ok) {
            http_response_code(500);
            return ['error' => 'Erreur lors de la suppression'];
        }

        return ['success' => true];
    }

    protected function processPutRequest(HttpRequest $request) {
        $id = $request->getId();
        $json = $request->getJson();
        $data = json_decode($json);
        
        if (!$id || !$data) {
            http_response_code(400);
            return ['error' => 'ID et donn�es requis'];
        }

        $order = $this->orders->find($id);
        if (!$order) {
            http_response_code(404);
            return ['error' => 'Commande non trouv�e'];
        }

        if (isset($data->status)) {
            $order->setStatus($data->status);
        }

        $ok = $this->orders->update($order);
        
        if (!$ok) {
            http_response_code(500);
            return ['error' => 'Erreur lors de la mise � jour'];
        }

        return $order;
    }

    protected function processPatchRequest(HttpRequest $request) {
        return $this->processPutRequest($request);
    }
}
