import './App.css';
import {Icon} from '@iconify/react';
import {useState, useEffect, useRef} from 'react';

function App () {
  const [isMenuVisible, setIsMenuVisible] = useState (true);
  const [isFullscreen, setIsFullscreen] = useState (false);
  const [openCollapse, setOpenCollapse] = useState('datosPersonales'); // Inicialmente abierto
  const [open, setOpen] = useState (null);
  const [isEmpresaExpanded, setIsEmpresaExpanded] = useState (false);
  const [isPersonalExpanded, setIsPersonalExpanded] = useState (false);
  const [selectedItem, setSelectedItem] = useState ('empresa'); // Inicialmente seleccionamos 'personal'
  const [isMobile, setIsMobile] = useState (window.innerWidth < 1600);
  // Definir el estado isCollapseOpen
const [isCollapseOpen, setIsCollapseOpen] = useState(false);
const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);
  const menuRef = useRef (null); // Referencia al menú
  const [searchTerm, setSearchTerm] = useState ('');
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState ([]);
  const [selectedMenu, setSelectedMenu] = useState('personal');
  const users = [
    {
      id: 1,
      name: 'Usuario1',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    },
    {
      id: 2,
      name: 'Usuario2',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    },
  ];

  const toggleMenu = () => {
    setIsMenuVisible (!isMenuVisible);
  };

// Función para manejar la selección de una sugerencia
const handleSuggestionClick = (userName) => {
  setSearchTerm(userName); // Autocompletar la búsqueda con el nombre del usuario
  setFilteredUsers([]); // Limpiar las sugerencias
  setHasSelectedSuggestion(true); // Marcar que ya se seleccionó una sugerencia
};

  const toggleCollapse = collapseName => {
    setOpenCollapse (openCollapse === collapseName ? null : collapseName);
  };

  const toggle = collapseName => {
    setOpen (open === collapseName ? null : collapseName);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    // Asegurarse de que el primer collapse esté abierto al cambiar
    if (item === 'personal') {
      setOpenCollapse('datosPersonales');
    } else if (item === 'empresa') {
      setOpenCollapse('datosPersonales');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen ();
      setIsFullscreen (true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen ();
        setIsFullscreen (false);
      }
    }
  };
  const handleSearch = () => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setIsCollapseOpen(filtered.length > 0); // Abrir el colapsable solo si hay resultados
    } else {
      setFilteredUsers([]);
      setIsCollapseOpen(false); // Cerrar el colapsable si no hay término de búsqueda
    }
    setHasSearched(true);
  };

  const toggleEmpresaExpansion = () => {
    setIsEmpresaExpanded (!isEmpresaExpanded);
  };

  const togglePersonalExpansion = () => {
    setIsPersonalExpanded (!isPersonalExpanded); // Función para expandir/contraer Datos Personales
  };

  useEffect (() => {
    const handleResize = () => {
      setIsMobile (window.innerWidth < 1600);
      if (window.innerWidth >= 1600) {
        setIsMenuVisible (true);
      } else {
        setIsMenuVisible (false);
      }
    };

    window.addEventListener ('resize', handleResize);
    return () => window.removeEventListener ('resize', handleResize);
  }, []);

  useEffect (
    () => {
      if (searchTerm) {
        const filtered = users.filter (user =>
          user.name.toLowerCase ().includes (searchTerm.toLowerCase ())
        );
        setFilteredUsers (filtered);
      } else {
        setFilteredUsers ([]);
      }
    },
    [searchTerm]
  );

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect (
    () => {
      const handleClickOutside = event => {
        if (
          isMobile &&
          isMenuVisible &&
          menuRef.current &&
          !menuRef.current.contains (event.target)
        ) {
          setIsMenuVisible (false); // Cierra el menú si se hace clic fuera
        }
      };

      // Agrega el listener de clics
      document.addEventListener ('mousedown', handleClickOutside);

      // Limpia el listener al desmontar el componente
      return () => {
        document.removeEventListener ('mousedown', handleClickOutside);
      };
    },
    [isMobile, isMenuVisible]
  );

  return (
    <div className="flex flex-col h-screen bg-base-200 ">
  <div className="flex flex-1">
        {/* Menú en la izquierda */}
        <div
  ref={menuRef}
  className={`bg-base-100 transition-all duration-300 ease-in-out ${
    isMenuVisible ? 'w-85' : 'w-0 overflow-hidden'
  } ${
    isMobile && isMenuVisible ? 'fixed z-50 h-screen shadow-lg' : 'fixed h-screen shadow-lg'
  }`}
>
  <div className="bg-base-100 h-full flex flex-col">
    <div className="w-full text-center text-4xl font-bold py-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
      Tusa
    </div>

    <ul className="menu menu-xs bg-base-100 rounded-lg max-w-xs w-full space-y-2 p-4 flex-1 overflow-y-auto">
      {/* Dashboard */}
      <li className="rounded-md transition-all">
        <details className="w-full">
          <summary className="flex items-center space-x-3 p-2 rounded-md hover:text-gray-100 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="#e35601" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4" />
                <path d="M7 10h2l2 3l2-6l1 3h3" />
              </g>
            </svg>
            <span className="text-gray-500">Panel</span>
            <svg className="ml-auto text-gray-500 transform transition-all duration-200" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 10l5 5 5-5z" className="transform rotate-90" />
            </svg>
          </summary>
          <ul className="space-y-2 pl-6">
            <li className="rounded-md">
              <a className="flex items-center space-x-3 p-2 rounded-md hover:text-gray-600 text-lg">
                <span className="text-gray-500">Dashboard</span>
              </a>
            </li>
          </ul>
        </details>
      </li>

      {/* Aplicaciones */}
      <li className="text-gray-500 text-lg">Aplicaciones</li>

      {/* Acciones */}
      <li className="rounded-md transition-all">
        <details className="w-full">
          <summary className="flex items-center space-x-3 p-2 rounded-md hover:text-gray-600 cursor-pointer text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#01e352" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8zm6.78 1a.7.7 0 0 0-.48.2l-1.22 1.21l2.5 2.5L20.8 5.7c.26-.26.26-.7 0-.95L19.25 3.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L9 12.5V15h2.5l7.37-7.38z" />
            </svg>
            <span className="text-gray-500">Acciones</span>
            <svg className="ml-auto text-gray-500 transform transition-all duration-200" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 10l5 5 5-5z" className="transform rotate-90" />
            </svg>
          </summary>
          <ul className="space-y-2 pl-6">
            <li className="rounded-md">
              <a
                onClick={() => setSelectedMenu('personal')}
                className={`flex items-center space-x-3 p-2 rounded-md hover:text-gray-600 text-lg ${
                  selectedMenu === 'personal' ? 'bg-gray-100 text-gray-500' : 'text-gray-500'
                }`}
              >
                <span>Personal</span>
              </a>
            </li>
            <li className="rounded-md">
              <a
                onClick={() => setSelectedMenu('documentos')}
                className={`flex items-center space-x-3 p-2 rounded-md hover:text-gray-600 text-lg ${
                  selectedMenu === 'documentos' ? 'bg-gray-100 text-gray-500' : 'text-gray-500'
                }`}
              >
                <span>Documentos</span>
              </a>
            </li>
          </ul>
        </details>
      </li>

      {/* Opciones */}
      <li className="rounded-md transition-all">
        <a className="flex items-center space-x-3 p-2 rounded-md hover:text-gray-600 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2q1.2 0 2.338.275t2.187.8q.375.2.488.6t-.138.75t-.663.45t-.812-.1q-.8-.375-1.663-.575T12 4Q8.675 4 6.337 6.338T4 12t2.338 5.663T12 20t5.663-2.337T20 12q0-.2-.012-.387t-.038-.388q-.05-.425.163-.812t.637-.513q.4-.125.75.075t.4.6q.05.35.075.7T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1.4-8.2l9.3-9.325q.275-.275.688-.288t.712.288q.275.275.275.7t-.275.7L11.3 15.9q-.3.3-.7.3t-.7-.3l-2.85-2.85q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z" />
          </svg>
          <span className="text-gray-500">Autorización</span>
        </a>
      </li>
    </ul>

    <div className="flex items-center p-4 bg-base-200 border-t rounded-box border-base-300 mt-auto ml-4 mr-4 mb-3">
      <div className="avatar mr-4">
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar del usuario" />
        </div>
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-lg font-semibold">Mi Usuario</h3>
        <p className="text-sm text-gray-500">correo@gmail.com</p>
      </div>
    </div>
  </div>
</div>



        {/* Contenido principal (navbar y componentes) */}
        <div
  className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out"
  style={{ marginLeft: isMenuVisible ? '340px' : '0' }}
>
          {/* Navbar */}
          <div className="navbar bg-base-100 shadow-sm h-21">
            <div className="flex-none">
              {/* Botón de Pantalla Completa */}
              <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost font-bold text-2xl ">Tusa</a>
            </div>
            <div className="flex gap-2">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="dracula"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              <div className="flex-none">
                <button
                  className="btn btn-ghost"
                  aria-label="Pantalla completa"
                  onClick={toggleFullscreen}
                >
                  {/* Icono de minimizar, se muestra cuando no estamos en pantalla completa */}
                  {!isFullscreen
                    ? <Icon icon="lucide:fullscreen" className="size-6" />
                    : <Icon icon="lucide:minimize" className="size-6" />}
                </button>
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                      {' '}
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item" />
                  </div>
                </button>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                 
                  <li><a>Cerrar Sesión</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Contenido principal */}
          <div className="p-8 bg-base-300 flex-1 overflow-y-auto">
          {selectedMenu === 'personal' ? (
    <>
<div className="collapse bg-base-100 border-base-300 border -mt-4">
  <input
    type="checkbox"
    checked={isCollapseOpen} // Controla si el colapsable está abierto
    onChange={() => setIsCollapseOpen(!isCollapseOpen)} // Alternar entre abierto y cerrado
  />
  <div className="collapse-title text-2xl font-bold text-gray-400">Personal</div>
  <div className="collapse-content text-sm">
    {hasSearched ? (
      filteredUsers.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
            <th>ID Matricula</th>
            <th>Ap Paterno</th>
            <th>Ap Materno</th>
              <th>Nombres</th>
              <th>ID empresa</th>
              <th>Fecha Nacimiento</th>
              <th>Reg Fed Causante</th>
              <th>Dirección</th>
              <th>Colonia</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Codigo Postal</th>
              <th>Pais</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <th>0000</th>
            <th>paterno</th>
            <th>materno</th>
                <td>{user.name}</td>
                <th>00000</th>
              <th>00/00/2025</th>
              <th>MECE640DHFI363</th>
              <th>Dirección</th>
              <th>Colonia</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>0000</th>
              <th>Mexico</th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron registros.</p>
      )
    ) : (
      <p>Sin registros sugeridos.</p>
    )}
  </div>
</div>
            <div className="flex space-x-4 mb-4 bg-base-300 h-180 mt-4">
              {/* Columna izquierda (fotografía, antigüedad, tallas) */}
              <div
                className={`${isEmpresaExpanded || isPersonalExpanded ? 'hidden' : 'block'}`}
              >
<div className="relative flex items-center space-x-2 mt-2">
  {/* Contenedor de búsqueda y botón en la misma línea */}
  <label className="input rounded-box flex-1 flex">
  <input
  type="search"
  placeholder="Buscar usuario"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setHasSelectedSuggestion(false); // Resetear si se borra el término de búsqueda
      setIsCollapseOpen(false); // Cerrar el desplegable si el campo está vacío
    }
  }}
  className="p-2 pl-1 pr-2 rounded-md text-base w-full"
/>
  </label>

  {/* Botón de búsqueda */}
  <button className="btn btn-circle" onClick={handleSearch}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="#5242e9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
        d="M8.984 2c-2.807.064-4.446.331-5.566 1.447C2.438 4.424 2.11 5.797 2 8m13.017-6c2.806.064 4.445.331 5.566 1.447c.98.977 1.308 2.35 1.417 4.553m-6.983 14c2.806-.064 4.445-.331 5.566-1.447c.98-.977 1.308-2.35 1.417-4.553M8.984 22c-2.807-.064-4.446-.331-5.566-1.447C2.438 19.576 2.11 18.203 2 16m13-1l2 2m-1-5.5a4.5 4.5 0 1 0-9 0a4.5 4.5 0 0 0 9 0"
        color="#5242e9"
      />
    </svg>
  </button>
</div>

{/* Sugerencias que se muestran debajo del cuadro de búsqueda */}
{searchTerm && !hasSelectedSuggestion && filteredUsers.length > 0 && (
  <div className="absolute z-10 mt-2 w-75 bg-base-100 border border-base-300 rounded-box shadow-lg">
    <ul className="menu menu-xs bg-base-100 rounded-box w-full space-y-2 p-2">
      {filteredUsers.map((user) => (
        <li key={user.id} className="rounded-md transition-all">
          <a
            onClick={() => handleSuggestionClick(user.name)} // Seleccionar sugerencia
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-base-200 cursor-pointer"
          >
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={user.avatar} alt={user.name} />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-base">{user.name}</span>
              <span className="text-sm text-gray-500">usuario@gmail.com</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
)}


                <fieldset className="fieldset mb-2 flex-1 w-full bg-base-100 border border-base-300 p-4 rounded-box">
                  <legend className="fieldset-legend text-2xl font-bold">
                    Fotografia
                  </legend>
                  <div className="flex justify-center items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="btn btn-primary btn-block btn-lg rounded-box">
                      Cargar Foto
                    </button>
                  </div>
                </fieldset>
                <fieldset className="fieldset mb-1 flex-1 w-full h-30 bg-base-100 border border-base-300 p-4 rounded-box">
                  <legend className="fieldset-legend text-xl font-bold">
                    Antigüedad
                  </legend>
                  <div className="flex space-x-4">
                    <label className="floating-label mb-4 flex-1">
                      <span>Años</span>
                      <input
                        type="text"
                        placeholder="4 Años"
                        className="input input-md w-full"
                      />
                    </label>
                    <label className="floating-label mb-4 flex-1">
                      <span>Meses</span>
                      <input
                        type="text"
                        placeholder="48 Meses"
                        className="input input-md w-full"
                      />
                    </label>
                  </div>
                </fieldset>
                <fieldset className="fieldset mb-1 flex-1 h-80 w-full bg-base-100 border border-base-300 p-4 rounded-box">
                  <legend className="fieldset-legend text-xl font-bold mb-2 ">
                    Tallas
                  </legend>
                  <div className="grid grid-cols-2 gap-4 w-full -mt-7">
                    <div className="-mb-1">
                      <fieldset className="fieldset">
                        <label htmlFor="camisa" className="block mb-1 font-[DM Sans] text-base font-normal antialiased"  style={{
    color: 'rgba(64, 64, 64, 0.8)'  
  }}>
                          Camisa
                        </label>
                        <select
                          id="camisa"
                          defaultValue="Pick a browser"
                          className="select"
                        >
                           <option disabled={false}>Seleccionar</option>
                          <option>CH</option>
                          <option>M</option>
                          <option>G</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="-mb-1">
                      <fieldset className="fieldset">
                        <label htmlFor="pantalon" className="block mb-1 font-[DM Sans] text-base font-normal antialiased"  style={{
    color: 'rgba(64, 64, 64, 0.8)'  
  }}>
                          Pantalón
                        </label>
                        <select
                          id="pantalon"
                          defaultValue="Pick a browser"
                          className="select"
                        >
                          <option disabled={false}>Seleccionar</option>
                          <option>CH</option>
                          <option>M</option>
                          <option>G</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="-mb-1">
                      <fieldset className="fieldset">
                        <label htmlFor="zapatos" className="block mb-1 font-[DM Sans] text-base font-normal antialiased"  style={{
    color: 'rgba(64, 64, 64, 0.8)'  
  }}>
                          Zapatos
                        </label>
                        <select
                          id="zapatos"
                          defaultValue="Pick a browser"
                          className="select"
                        >
                           <option disabled={false}>Seleccionar</option>
                          <option>25.5</option>
                          <option>23.0</option>
                          <option>24</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="-mb-1">
                      <fieldset className="fieldset">
                        <label htmlFor="playera" className="block mb-1 font-[DM Sans] text-base font-normal antialiased"  style={{
    color: 'rgba(64, 64, 64, 0.8)'  
  }}>
                          Playera
                        </label>
                        <select
                          id="playera"
                          defaultValue="Pick a browser"
                          className="select"
                        >
                          <option disabled={false}>Seleccionar</option>
                          <option>CH</option>
                          <option>M</option>
                          <option>G</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="-mb-1">
                      <fieldset className="fieldset">
                        <label htmlFor="chamarra" className="block mb-1 font-[DM Sans] text-base font-normal antialiased "  style={{
    color: 'rgba(64, 64, 64, 0.8)'  
  }}>
                          Chamarra
                        </label>
                        <select
                          id="chamarra"
                          defaultValue="Pick a browser"
                          className="select"
                        >
                           <option disabled={false}>Seleccionar</option>
                          <option>CH</option>
                          <option>M</option>
                          <option>G</option>
                        </select>
                      </fieldset>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Columna derecha (Datos Personales o Empresa) */}
              <div
                className={`${isEmpresaExpanded || isPersonalExpanded ? 'w-full' : 'w-full'}`}
              >
                <div className="flex justify-between">
                  {/* Menú horizontal para "Datos Personales" y "Datos Empresa" */}
                  <ul className="menu menu-horizontal bg-base-200 rounded-box mb-4">
                  <li
                      className={`${selectedItem === 'empresa' ? 'bg-primary text-white rounded-box' : ''}`}
                    >
                      <a
                        onClick={() => handleSelect ('empresa')}
                        className="flex items-center"
                      >
                        <Icon icon="mdi:globe" className="h-5 w-5" />
                        <span className="ml-2">Datos Empresa</span>
                      </a>
                    </li>
                    <li
                      className={`${selectedItem === 'personal' ? 'bg-primary text-white rounded-box' : ''}`}
                    >
                      <a
                        onClick={() => handleSelect ('personal')}
                        className="flex items-center"
                      >
                        <Icon icon="mdi:user" className="h-5 w-5" />
                        <span className="ml-2">Datos Personales</span>
                      </a>
                    </li>
                    
                  </ul>

                  {/* Menú horizontal con íconos alineado a la derecha */}
                  <ul className="menu menu-horizontal bg-base-300 rounded-box">
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#0161e3"
                            d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7zm2 16H5V5h11.17L19 7.83zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3M6 6h9v4H6z"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="#01e32b"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#e30101"
                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.35 0 2.6-.437t2.3-1.263L5.7 7.1q-.825 1.05-1.263 2.3T4 12q0 3.35 2.325 5.675T12 20m6.3-3.1q.825-1.05 1.263-2.3T20 12q0-3.35-2.325-5.675T12 4q-1.35 0-2.6.437T7.1 5.7z"
                          />
                        </svg>
                        {' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contenido de Datos Personales o Empresa */}
                {selectedItem === 'personal'
                  ? <fieldset className="fieldset flex-1 w-full bg-base-100 border border-base-300 p-4 rounded-box h-174 flex flex-col -mt-4 relative -mt-1">
                      <legend className="fieldset-legend text-2xl font-bold flex items-center justify-between">
                        Personales
                      </legend>
                      {/* Acordeón de Datos Personales */}
                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                      <input
    type="checkbox"
    checked={openCollapse === 'datosPersonales'}
    onChange={() => toggleCollapse('datosPersonales')}
  />
                        <div className="collapse-title font-[DM Sans] text-base font-normal antialiased"  >
                          Datos Personales
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">Nombre</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Nombre"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">A. Paterno</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Apellido Paterno"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">A. Materno</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Apellido Materno"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Estado de Nacimiento
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Estado de Nacimiento"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Municipio de Nacimiento
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Municipio de Nacimiento"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha de Nacimiento
                            </label>
                            <input
                              type="date"
                              className="input"
                              placeholder="Fecha de Nacimiento"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Sexo</label>
                            <select className="select">
                              <option>Masculino</option>
                              <option>Femenino</option>
                            </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Nacionalidad
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Nacionalidad"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Estado Civil
                            </label>
                            <select className="select">
                              <option>Soltero</option>
                              <option>Casado</option>
                              <option>Divorciado</option>
                              <option>Viudo</option>
                            </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Tipo de Sangre
                            </label>
                            <select className="select">
                              <option>A+</option>
                              <option>A-</option>
                              <option>B+</option>
                              <option>B-</option>
                              <option>AB+</option>
                              <option>AB-</option>
                              <option>O+</option>
                              <option>O-</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Acordeón de Información de Contacto y Documentación */}
                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                        <input
                          type="checkbox"
                          checked={openCollapse === 'informacionContacto'}
                          onChange={() =>
                            toggleCollapse ('informacionContacto')}
                        />
                        <div className="collapse-title font-[DM Sans] text-base antialiased font-normal"  >
                          Información de Contacto y Documentación
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">Calle</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Calle"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Número</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Número"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Entre Calle 1
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Entre Calle 1"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Entre Calle 2
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Entre Calle 2"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Colonia</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Colonia"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Ciudad</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Ciudad"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">CP</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="CP"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Estado</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Estado"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">País</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="País"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">IMSS</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="IMSS"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">RFC</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="RFC"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">CURP</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="CURP"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Tipo de Nómina
                            </label>
                            <select className="select">
                              <option>Semanal</option>
                              <option>Quincenal</option>
                              <option>Mensual</option>
                            </select>
                          </div>
                          <div>
                            <label className="fieldset-label">E-mail</label>
                            <input
                              type="email"
                              className="input"
                              placeholder="E-mail"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Teléfono Personal
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Teléfono Personal"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Teléfono Emergencia #2
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Teléfono Emergencia #2"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              No. Cred. Elector
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="No. Cred. Elector"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Folio Cred. Elector
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Folio Cred. Elector"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Disp. cambio de Residencia
                            </label>
                            <select className="select">
                              <option>Sí</option>
                              <option>No</option>
                            </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Disp. de Viajar
                            </label>
                            <select className="select">
                              <option>Sí</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* Botón de expansión para Datos Personales */}
                      <div className="absolute bottom-4 left-4">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={togglePersonalExpansion}
                        >
                          {isPersonalExpanded
                            ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-dasharray="64"
                                    stroke-dashoffset="64"
                                    d="M3 12c0 4.97 4.03 9 9 9c4.97 0 9 -4.03 9 -9c0 -4.97 -4.03 -9 -9 -9c-4.97 0 -9 4.03 -9 9Z"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      dur="0.6s"
                                      values="64;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="12"
                                    stroke-dashoffset="12"
                                    d="M7 12h9.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.7s"
                                      dur="0.2s"
                                      values="12;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="8"
                                    stroke-dashoffset="8"
                                    d="M17 12l-4 4M17 12l-4 -4"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.9s"
                                      dur="0.2s"
                                      values="8;0"
                                    />
                                  </path>
                                </g>
                              </svg>
                            : <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-dasharray="64"
                                    stroke-dashoffset="64"
                                    d="M21 12c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9Z"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      dur="0.6s"
                                      values="64;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="12"
                                    stroke-dashoffset="12"
                                    d="M17 12h-9.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.7s"
                                      dur="0.2s"
                                      values="12;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="8"
                                    stroke-dashoffset="8"
                                    d="M7 12l4 4M7 12l4 -4"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.9s"
                                      dur="0.2s"
                                      values="8;0"
                                    />
                                  </path>
                                </g>
                              </svg>}
                        </button>
                      </div>
                    </fieldset>
                  : <fieldset className="fieldset flex-1 w-full bg-base-100 border border-base-300 p-4 rounded-box h-174 flex flex-col -mt-4 relative -mt-1">
                      <legend className="fieldset-legend text-2xl font-bold flex items-center justify-between">
                        Empresa
                      </legend>
                      {/* Colapsibles de Empresa */}
                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
  {/* Input para controlar si la sección está expandida */}
  <input
    type="checkbox"
    checked={openCollapse === 'datosPersonales'}
    onChange={() => toggleCollapse('datosPersonales')}
  />

  {/* Título de la sección */}
  <div className="collapse-title font-[DM Sans] text-base font-normal antialiased">
    Datos Personales
  </div>

  {/* Contenido de la sección */}
  <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {/* Sección para Matricula */}
    <div>
      <label className="fieldset-label">
        Matricula
      </label>
      <select className="select">
      <option disabled={false}>Seleccionar</option>
        <option>00123</option>
        <option>00124</option>
        <option>00125</option>
      </select>
    </div>

    {/* Sección para Nombre Completo */}
    <div>
      <label className="fieldset-label">
        Nombre Completo
      </label>
      <select className="select">
      <option disabled={false}>Seleccionar</option>
        <option>fulanito uno</option>
        <option>fulanito dos</option>
        <option>fulanito tres</option>
      </select>
    </div>

    {/* Sección para No. Celular */}
    <div>
      <label className="fieldset-label">
        No. Celular
      </label>
      <select className="select">
      <option disabled={false}>Seleccionar</option>
        <option>7711940900</option>
        <option>7200120345</option>
        <option>5505140839</option>
      </select>
    </div>

    {/* Nueva línea para Observaciones */}
    <div className="col-span-4">
      <label className="fieldset-label">
        Observaciones
      </label>
      <textarea className="textarea w-full" placeholder="Escribe tus observaciones aquí..."></textarea>
    </div>
  </div>
</div>

                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                        <input
                          type="checkbox"
                          checked={openCollapse === 'informacionLaboral'}
                          onChange={() => toggleCollapse ('informacionLaboral')}
                        />
                        <div className="collapse-title font-[DM Sans] text-base font-normal antialiased"  >
                          Información Laboral
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">
                              Empleado
                            </label>
                            <select className="select">
                            <option disabled={false}>Seleccionar</option>
        <option>uno</option>
        <option>dos</option>
        <option>tres</option>
      </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Área
                            </label>
                            <select className="select">
                            <option disabled={false}>Seleccionar</option>
        <option>Área uno</option>
        <option>Área dos</option>
        <option>Área tres</option>
      </select>
                          </div>
                          <div>
                            <label className="fieldset-label">Puesto</label>
                            <select className="select">
                            <option disabled={false}>Seleccionar</option>
        <option>encargado</option>
        <option>supervisor</option>
        <option>supervisor de area</option>
      </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Sueldo Promedio
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="sueldo Promedio"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha de Ingreso
                            </label>
                            <input
                              type="date"
                              className="input"
                              placeholder="fecha ingreso"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha Planta
                            </label>
                            <input
                              type="date"
                              className="input"
                              placeholder="fecha planta"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Fecha Baja</label>
                            <input
                              type="date"
                              className="input"
                              placeholder="fecha baja"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                        <input
                          type="checkbox"
                          checked={openCollapse === 'seguridadSocial'}
                          onChange={() => toggleCollapse ('seguridadSocial')}
                        />
                        <div className="collapse-title font-[DM Sans] text-base font-normal antialiased"  >
                          Información de Seguridad Social
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">No. Póliza</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="No. Póliza"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              No. Cta Bancaria
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="cuenta bancaria"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              No. Cred. INFONAVIT
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="INFONAVIT"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              No. Cred. FONACOT
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="FONACOT"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha Alta IMSS
                            </label>
                            <input
                              type="email"
                              className="input"
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha Baja IMSS
                            </label>
                            <input
                              type="email"
                              className="input"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                        <input
                          type="checkbox"
                          checked={openCollapse === 'empresaBeneficios'}
                          onChange={() => toggleCollapse ('empresaBeneficios')}
                        />
                        <div className="collapse-title font-[DM Sans] text-base font-normal antialiased"  >
                          Información de Empresa y Beneficios
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">Empresa</label>
                            <select className="select">
                            <option disabled={false}>Seleccionar</option>
        <option>Auto Transportación Mexicana ATM</option>
        <option>empresa dos</option>
        <option>empresa tres</option>
      </select>
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Auto Transportación Mexicana
                            </label>
                            <input
                              type="email"
                              className="input"
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Tarjeta de Combustible
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="tarjeta de combustible"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Institución Bancaria
                            </label>
                            <select className="select">
                            <option disabled={false}>Seleccionar</option>
        <option>BBVA</option>
        <option>SANTANDER</option>
      </select>
                          </div>
                        </div>
                      </div>

                      <div className="collapse mb-4 bg-base-100 border-base-300 border">
                        <input
                          type="checkbox"
                          checked={openCollapse === 'ubicacionContrato'}
                          onChange={() => toggleCollapse ('ubicacionContrato')}
                        />
                        <div className="collapse-title font-[DM Sans] text-base font-normal antialiased"  >
                          Información de Ubicación y Contrato
                        </div>
                        <div className="collapse-content text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="fieldset-label">
                              Número de Utcio
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="numero de utcio"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">Bimestre</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="bimestre"
                            />
                          </div>
                          <div>
                            <label className="fieldset-label">
                              Fecha de Ingreso de Póliza
                            </label>
                            <input
                              type="date"
                              className="input"
                              placeholder="ingreso poliza"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Botón de expansión para Empresa */}
                      <div className="absolute bottom-4 left-4">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={toggleEmpresaExpansion}
                        >
                          {isEmpresaExpanded
                            ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-dasharray="64"
                                    stroke-dashoffset="64"
                                    d="M3 12c0 4.97 4.03 9 9 9c4.97 0 9 -4.03 9 -9c0 -4.97 -4.03 -9 -9 -9c-4.97 0 -9 4.03 -9 9Z"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      dur="0.6s"
                                      values="64;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="12"
                                    stroke-dashoffset="12"
                                    d="M7 12h9.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.7s"
                                      dur="0.2s"
                                      values="12;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="8"
                                    stroke-dashoffset="8"
                                    d="M17 12l-4 4M17 12l-4 -4"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.9s"
                                      dur="0.2s"
                                      values="8;0"
                                    />
                                  </path>
                                </g>
                              </svg>
                            : <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-dasharray="64"
                                    stroke-dashoffset="64"
                                    d="M21 12c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9Z"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      dur="0.6s"
                                      values="64;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="12"
                                    stroke-dashoffset="12"
                                    d="M17 12h-9.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.7s"
                                      dur="0.2s"
                                      values="12;0"
                                    />
                                  </path>
                                  <path
                                    stroke-dasharray="8"
                                    stroke-dashoffset="8"
                                    d="M7 12l4 4M7 12l4 -4"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.9s"
                                      dur="0.2s"
                                      values="8;0"
                                    />
                                  </path>
                                </g>
                              </svg>}
                        </button>
                      </div>
                    </fieldset>}
              </div>
            </div>
            </>
  ) : selectedMenu === 'documentos' ? (
    <>
     <h1 className="text-2xl font-bold bg-base-300 p-4 border-base-300 rounded-lg text-gray-400 -mt-8">
  Documentos
</h1>
<div className="flex space-x-4 mb-4 bg-base-300 h-100">
  {/* Selector de archivos */}
  <div className="w-2/3 p-4 bg-base-100 border border-base-300 rounded-box">
    <div className="flex items-center justify-center h-full">
    <label className="flex flex-col items-center justify-center w-full h-90 border-3 border-dashed border-gray-500 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300">
  <div className="flex flex-col items-center justify-center pt-5 pb-6">
    <svg className="w-10 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
    <p className="mb-2 text-xl text-gray-500">
      <span className="font-semibold">Haz clic para subir o arrastra y suelta</span>
    </p>
  </div>
  <input id="dropzone-file" type="file" className="hidden" />
  <button className="btn btn-primary btn-lg rounded-box" style={{ width: '250px' }}>Seleccionar Archivo</button>
</label>

    </div>
  </div>
 

{/* Cuadro con título "Acciones" y botones centrados */}
<fieldset className="fieldset w-1/3 p-4 bg-base-100 border border-base-300 rounded-box -mt-5">
  <legend className="fieldset-legend text-xl font-bold mb-10">
    Acciones
  </legend>
  <div className="flex flex-col items-center space-y-6 ">
    <button className="btn flex items-center h-17" style={{ width: '290px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
        <g fill="none" stroke="#b45918" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2M9 9h1m-1 4h6m-6 4h6"/>
        </g>
      </svg>
      Documentos de Personal
    </button>
    <button className="btn flex items-center h-17" style={{ width: '290px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
        <g fill="none" stroke="#18b44e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3s-3.582-3-8-3s-8 1.343-8 3"/>
          <path d="M4 6v6c0 1.657 3.582 3 8 3q.718 0 1.402-.046M20 12V6"/>
          <path d="M4 12v6c0 1.526 3.04 2.786 6.972 2.975m7.448-5.365a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3z"/>
        </g>
      </svg>
      Actualizar Fechas
    </button>
    <button className="btn flex items-center h-17" style={{ width: '290px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
        <path fill="none" stroke="#185cb4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"/>
      </svg>
      Consultar Carpetas de Archivos
    </button>
  </div>
</fieldset>

</div>

{/* Título de la tabla */}
<h2 className="text-xl font-semibold mb-4">Registros</h2>

{/* Tabla de registros */}
<div className="w-full p-4 bg-base-100 border border-base-300 rounded-box">
  <table className="table w-full">
    <thead>
      <tr>
      <th style={{width: '1200px'}}>Documento</th>
      <th className="text-right" style={{ paddingRight: '10px' }}>Status</th>
<th className="text-right" style={{ paddingRight: '10px' }}>Fecha Vencimiento</th>

      </tr>
    </thead>
    <tbody>
    <tr>
    <td className="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#909090" d="m24.1 2.072l5.564 5.8v22.056H8.879V30h20.856V7.945z"/><path fill="#f4f4f4" d="M24.031 2H8.808v27.928h20.856V7.873z"/><path fill="#7a7b7c" d="M8.655 3.5h-6.39v6.827h20.1V3.5z"/><path fill="#dd2025" d="M22.472 10.211H2.395V3.379h20.077z"/><path fill="#464648" d="M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .335-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.409-.104a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.671-2.306c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.08-3.915H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892"/><path fill="#dd2025" d="M21.781 20.255s3.188-.578 3.188.511s-1.975.646-3.188-.511m-2.357.083a7.5 7.5 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14 14 0 0 0 1.658 2.252a13 13 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.8 10.8 0 0 1-.517 2.434a4.4 4.4 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444c-.003.001-1.576 3.056-2.6 2.444M25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14 14 0 0 0-2.453.173a12.5 12.5 0 0 1-2.012-2.655a11.8 11.8 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.3 9.3 0 0 0 .665 2.338s-.425 1.323-.987 2.639s-.946 2.006-.946 2.006a9.6 9.6 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945c.374.508 1.683.623 2.853-.91a23 23 0 0 0 1.7-2.492s1.784-.489 2.339-.623s1.226-.24 1.226-.24s1.629 1.639 3.2 1.581s1.495-.939 1.485-1.035"/><path fill="#909090" d="M23.954 2.077V7.95h5.633z"/><path fill="#f4f4f4" d="M24.031 2v5.873h5.633z"/><path fill="#fff" d="M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .332-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.411-.105a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.67-2.306c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.077-3.915h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892"/></svg>
      <div>
        <div>Tech requirements.pdf</div>
        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>200 KB</div>
      </div>
    </td>
    <td className="text-right">
    <div className="badge badge-outline badge-success text-center ">Activo</div></td>
    <td className="text-right">Jan 4, 2025</td>
  </tr>
      <tr>
        <td className="flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#909090" d="m24.1 2.072l5.564 5.8v22.056H8.879V30h20.856V7.945z"/><path fill="#f4f4f4" d="M24.031 2H8.808v27.928h20.856V7.873z"/><path fill="#7a7b7c" d="M8.655 3.5h-6.39v6.827h20.1V3.5z"/><path fill="#dd2025" d="M22.472 10.211H2.395V3.379h20.077z"/><path fill="#464648" d="M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .335-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.409-.104a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.671-2.306c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.08-3.915H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892"/><path fill="#dd2025" d="M21.781 20.255s3.188-.578 3.188.511s-1.975.646-3.188-.511m-2.357.083a7.5 7.5 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14 14 0 0 0 1.658 2.252a13 13 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.8 10.8 0 0 1-.517 2.434a4.4 4.4 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444c-.003.001-1.576 3.056-2.6 2.444M25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14 14 0 0 0-2.453.173a12.5 12.5 0 0 1-2.012-2.655a11.8 11.8 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.3 9.3 0 0 0 .665 2.338s-.425 1.323-.987 2.639s-.946 2.006-.946 2.006a9.6 9.6 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945c.374.508 1.683.623 2.853-.91a23 23 0 0 0 1.7-2.492s1.784-.489 2.339-.623s1.226-.24 1.226-.24s1.629 1.639 3.2 1.581s1.495-.939 1.485-1.035"/><path fill="#909090" d="M23.954 2.077V7.95h5.633z"/><path fill="#f4f4f4" d="M24.031 2v5.873h5.633z"/><path fill="#fff" d="M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .332-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.411-.105a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.67-2.306c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.077-3.915h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892"/></svg>
         <div>
        <div>Tech requirements.pdf</div>
        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>200 KB</div>
      </div>
        </td>
        <td className="text-right">
        
    <div className="badge badge-outline badge-success text-center ">Activo</div></td>
        <td className="text-right">Jan 4, 2025</td>
      </tr>
      <tr>
        <td className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#909090" d="m24.1 2.072l5.564 5.8v22.056H8.879V30h20.856V7.945z"/><path fill="#f4f4f4" d="M24.031 2H8.808v27.928h20.856V7.873z"/><path fill="#7a7b7c" d="M8.655 3.5h-6.39v6.827h20.1V3.5z"/><path fill="#dd2025" d="M22.472 10.211H2.395V3.379h20.077z"/><path fill="#464648" d="M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .335-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.409-.104a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.671-2.306c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.08-3.915H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892"/><path fill="#dd2025" d="M21.781 20.255s3.188-.578 3.188.511s-1.975.646-3.188-.511m-2.357.083a7.5 7.5 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14 14 0 0 0 1.658 2.252a13 13 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.8 10.8 0 0 1-.517 2.434a4.4 4.4 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444c-.003.001-1.576 3.056-2.6 2.444M25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14 14 0 0 0-2.453.173a12.5 12.5 0 0 1-2.012-2.655a11.8 11.8 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.3 9.3 0 0 0 .665 2.338s-.425 1.323-.987 2.639s-.946 2.006-.946 2.006a9.6 9.6 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945c.374.508 1.683.623 2.853-.91a23 23 0 0 0 1.7-2.492s1.784-.489 2.339-.623s1.226-.24 1.226-.24s1.629 1.639 3.2 1.581s1.495-.939 1.485-1.035"/><path fill="#909090" d="M23.954 2.077V7.95h5.633z"/><path fill="#f4f4f4" d="M24.031 2v5.873h5.633z"/><path fill="#fff" d="M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2 2 0 0 0 .647-.117a1.4 1.4 0 0 0 .493-.291a1.2 1.2 0 0 0 .332-.454a2.1 2.1 0 0 0 .105-.908a2.2 2.2 0 0 0-.114-.644a1.17 1.17 0 0 0-.687-.65a2 2 0 0 0-.411-.105a2 2 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.94.94 0 0 1-.524.114m3.67-2.306c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.7 2.7 0 0 0 1.028-.175a1.7 1.7 0 0 0 .68-.491a1.9 1.9 0 0 0 .373-.749a3.7 3.7 0 0 0 .114-.949a4.4 4.4 0 0 0-.087-1.127a1.8 1.8 0 0 0-.4-.733a1.6 1.6 0 0 0-.535-.4a2.4 2.4 0 0 0-.549-.178a1.3 1.3 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.06 1.06 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a3 3 0 0 1-.033.513a1.8 1.8 0 0 1-.169.5a1.1 1.1 0 0 1-.363.36a.67.67 0 0 1-.416.106m5.077-3.915h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892"/></svg>
          <div>
        <div>Tech requirements.pdf</div>
        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>200 KB</div>
      </div>
        </td>
        <td className="text-right">
        <div className="badge badge-outline badge-success">Activo</div></td>
        <td className="text-right">Jan 2, 2025</td>
      </tr>
    </tbody>
  </table>
</div>

    </>
  ) : null}
</div>
          </div>
        </div>
      </div>
  );
}

export default App;
