/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import spring.entity.Roles;

/**
 *
 * @author hoang
 */
@Stateless
public class RolesStateLessBean implements RolesStateLessBeanLocal {
    @PersistenceContext(unitName = "Final_ProjectPU")
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }
    
    @Override
    public Roles findRoles(Integer roleID) { 
        return getEm().find(Roles.class, roleID);
    }

    @Override
    public boolean addRoles(Roles roles) {
        try {
            em.persist(roles);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    
    

}
