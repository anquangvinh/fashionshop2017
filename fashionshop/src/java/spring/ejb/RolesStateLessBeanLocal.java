/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import javax.ejb.Local;
import spring.entity.Roles;

/**
 *
 * @author hoang
 */
@Local
public interface RolesStateLessBeanLocal {

    Roles findRoles(Integer roleID);

    boolean addRoles(Roles roles);
    
}
