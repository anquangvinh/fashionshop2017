/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Local;
import spring.entity.Categories;
import spring.entity.DiscountVoucher;
import spring.entity.Orders;
import spring.entity.OrdersDetail;
import spring.entity.Products;
import spring.entity.SubCategories;

/**
 *
 * @author NganNgo
 */
@Local
public interface OrderStateLessBeanLocal {
    public List<Products> getAllProducts();
    public List<Orders> getAllOrder();
    public List<Categories> getAllCategory();
    public List<DiscountVoucher> getAllDiscountVoucher();
    public List<SubCategories> getSubCategoryByCateID(int id);
    public Orders getOrderByID(int orderID);
    public OrdersDetail getOrderDetailByID(int orderDetailID);
    public float sumTotalOrderDetail(List<OrdersDetail> ordersDetailList);
    public Products getProductByID(int productID);
    public List<Orders> getOrderListByUserID(int userID);
    public boolean confirmStatusOrder(Orders orders, short status);
    public boolean confirmStatusOrderDetail(OrdersDetail ordersDetail, short status);
}
