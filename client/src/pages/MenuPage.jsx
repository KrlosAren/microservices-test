import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../context/menu/MenuContext';
import {
  deleteMenu,
  getMenus,
  getMenusFromNode,
  postMenus,
  updateMenu,
} from '../context/menu/menuReducer';
import { SocketContext } from '../context/SocketContext';
import { types } from '../types/types';
import './post.css';

export const MenuPage = () => {
  const { online } = useContext(SocketContext);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });
  const { dispatch, menuState } = useContext(MenuContext);
  const { loading, menus } = menuState;

  useEffect(() => {
    getMenus().then((resp) => {
      if (resp.has_menu) {
        dispatch({
          type: types.allMenu,
          payload: resp.data,
        });
      } else {
        dispatch({
          type: types.noMenus,
        });
      }
    });
  }, []);

  useEffect(() => {
    getMenusFromNode().then((resp) => {
      console.log(resp);
    });
  }, []);

  const handleCheck = (e) => {
    setForm({
      ...form,
      available: e.target.checked,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const addNewMenu = async (e) => {
    e.preventDefault();
    console.log(form);
    if (
      form.name === '' ||
      form.description === '' ||
      form.price === '' ||
      form.slug === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    // socket.emit('new-menus', form);
    await postMenus(form);
  };

  const handleChangeStatus = async (menuId) => {
    const newMenus = menus.map((menu) => {
      if (menu.id === menuId) {
        return {
          ...menu,
          available: !menu.available,
        };
      }
      return menu;
    });
    dispatch({
      type: types.allMenu,
      payload: newMenus,
    });
    await updateMenu(menuId);
  };

  const handleDeleteMenu = async (menuId) => {
    await deleteMenu(menuId);
  };

  if (loading)
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );

  return (
    <div className='main'>
      <div>
        {online ? (
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: online ? 'green' : 'red',
            }}>
            online
          </p>
        ) : (
          <p>disconnect</p>
        )}
      </div>
      <hr />
      <div className='container__form'>
        <div>
          <h3>Add Menusss</h3>
        </div>
        <form className='form-post' onSubmit={addNewMenu}>
          <div>
            <label>Nombre</label>
            <input type='text' onChange={handleChange} name='name' />
          </div>
          <div>
            <label>Precio</label>
            <input type='text' onChange={handleChange} name='price' />
          </div>
          <div>
            <label>Descripcion</label>
            <input type='text' onChange={handleChange} name='description' />
          </div>
          <div>
            <label>Available</label>
            <input
              type='checkbox'
              onChange={handleCheck}
              name='available'
              checked={form.available}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <hr />
      <h3>Menu</h3>
      <hr />
      <div>
        <table
          style={{
            width: '100%',
            textAlign: 'center',
          }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Available</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>{menu.price}</td>
                <td>{menu.description}</td>
                <td>
                  <div
                    onClick={() => handleChangeStatus(menu.id)}
                    style={{
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50px',
                      margin: 'auto',
                      backgroundColor: menu.available ? 'green' : 'red',
                    }}></div>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteMenu(menu.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '5px',
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
