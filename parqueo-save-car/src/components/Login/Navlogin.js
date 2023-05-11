import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";

import "../landingPage/lading.css";
import "./NavLogin.css";
const Navlogin = () => {
  return (
    <div>
      <header className="Encabezado2">
        <section>
          <div>
            <Link to="/">
              <img className="image" src={logo} alt="log" />
            </Link>
          </div>
        </section>

        <section className="navegarnav">
          <div>
            <div className="navcli">
              <a clasName="cliente" href="/Ingresos">
                Ingresos{" "}
              </a>
            </div>
            <div className="navcli">
              <a clasName="cliente" href="/UsoSitios">
                Uso de sitios{" "}
              </a>
            </div>
            <div className="navcli">
              <a clasName="cliente" href="/Clientes">
                Clientes{" "}
              </a>
            </div>

            <div className="sesion">
              <a className="Cerrar" href="/">
                Cerrar Sesion
              </a>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};
/*<a className="inicio" href="/iniciosesion">Iniciar Sesión</a> */
export default Navlogin;
