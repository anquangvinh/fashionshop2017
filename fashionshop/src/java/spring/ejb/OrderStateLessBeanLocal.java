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
import spring.entity.SizesByColor;
import spring.entity.SubCategories;
import spring.entity.UserAddresses;

/**
 *
 * @author NganNgo
 */
@Local
public interface OrderStateLessBeanLocal {
    public List<Orders> getAllOrder();
    public List<Categories> getAllCategory();
    public List<DiscountVoucher> getAllDiscountVoucher();
    
    public List<SubCategories> getSubCategoryListByCateID(int id);
    public List<Orders> getOrderListByUserID(int userID);
    
    public Orders getOrderByID(int orderID);
    public Products getProductByID(int productID);
    public OrdersDetail getOrderDetailByID(int orderDetailID);
    public DiscountVoucher getDiscountVoucherByID(String discountVoucherID);
    public SizesByColor getSizesByColorBySizeIDandColorID(int sizeId, int colorId);
    public List<UserAddresses> getUserAddressListByUserID(int userId);
    
    public int createDiscountVoucher(DiscountVoucher newDiscountVoucher);
    
    public int updateDiscountVoucher(DiscountVoucher targetDiscountVoucher);
    
    public float sumTotalOrderDetail(List<OrdersDetail> ordersDetailList);
    public boolean confirmStatusOrder(Orders orders, short status);
    public boolean confirmStatusOrderDetail(OrdersDetail ordersDetail, short status);
}
