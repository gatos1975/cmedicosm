-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2023 a las 22:12:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_cmedico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `historial_cod` int(11) NOT NULL,
  `paciente_ced` varchar(10) NOT NULL,
  `medico_cod` varchar(10) NOT NULL,
  `historial_fec` datetime NOT NULL DEFAULT current_timestamp(),
  `historial_det` text NOT NULL COMMENT 'detalle anotaciones del historial',
  `historial_diag` text NOT NULL COMMENT 'diagnostico del paciente',
  `historial_trat` text NOT NULL COMMENT 'tratamiento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`historial_cod`, `paciente_ced`, `medico_cod`, `historial_fec`, `historial_det`, `historial_diag`, `historial_trat`) VALUES
(3, '1400373583', '0103458519', '2023-07-04 15:50:48', 'EL PACIENTE PRESENTE UN CORTE EN EL BRAZO IZQUIERDO, Y MUCHO FLUIDO DE SANGRE', 'PELEA', 'SE REALIZA UNA SUTURA'),
(4, '1400373578', '0103458519', '2023-07-04 17:48:33', 'PACIENTE PRESENTA DOLOR ABDOMINAL', 'APENDICITIS AGUDA', 'REALIZAR ECOGRAFIA.'),
(5, '1400373583', '0103458519', '2023-07-04 18:15:26', 'EL PACIENTE PRESENTA DOLOR FUERTE EN LA CABEZA', 'PRESION ALTA', 'TOMAR ENALAPRIN 10ML TAB-30'),
(6, '1400373583', '0103458519', '2023-07-05 11:06:28', 'poaciente llega con color de espalta', 'sdfsfsdfsdf', 'sdfs fsdfsdfsfsad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `medico_cod` varchar(10) NOT NULL,
  `medico_ape` varchar(30) NOT NULL,
  `medico_nom` varchar(30) NOT NULL,
  `medico_esp` varchar(30) NOT NULL,
  `medico_tel` varchar(10) NOT NULL,
  `medico_cor` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`medico_cod`, `medico_ape`, `medico_nom`, `medico_esp`, `medico_tel`, `medico_cor`) VALUES
('0103458519', 'Peñafiel Tapia', 'Liliam', 'Medico General', '098 847 54', 'liliampenafiel@hotmail.com'),
('1400328298', 'Astudillo Heredia', 'Victor Hugo', 'Medico Laboratorista', '098 847 54', 'victorastudillo@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `paciente_ced` varchar(10) NOT NULL COMMENT 'codigo del paciente: Cedula',
  `paciente_apel` varchar(30) NOT NULL COMMENT 'Apellidos',
  `paciente_nom` varchar(30) NOT NULL COMMENT 'Nombres',
  `paciente_fnac` date NOT NULL COMMENT 'Fecha de nacimiento',
  `paciente_gen` varchar(9) NOT NULL COMMENT 'GENERO: Masculino/Femenino',
  `paciente_eciv` varchar(12) NOT NULL COMMENT 'Estado Civil:Soltero, Casod, viudo,Divorciado, UnionLibre',
  `paciente_tel` varchar(10) NOT NULL COMMENT 'Telefono/Celular',
  `paciente_cor` varchar(50) NOT NULL COMMENT 'Correo Electronico',
  `paciente_dom` varchar(50) NOT NULL COMMENT 'Domicilio del Paciente',
  `paciente_otro` varchar(50) NOT NULL COMMENT 'Datos adicionales'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`paciente_ced`, `paciente_apel`, `paciente_nom`, `paciente_fnac`, `paciente_gen`, `paciente_eciv`, `paciente_tel`, `paciente_cor`, `paciente_dom`, `paciente_otro`) VALUES
('1400373578', 'ATAMAINT ENTSAKUA', 'FLORENTINA', '1982-07-10', 'FEMENINO', 'CASADA', '0999458324', 'floreatamaint@gmail.com', 'barrio centro - parroquia sevilla don bosco', 'ORH+'),
('1400373583', 'AYUY AGUANANCHI', 'ANTONIO WILMER', '1975-07-31', 'MASCULINO', 'SOLTERO', '0999122053', 'wilmerayuy@gmail.com', 'PARROQUIA SEVILLA DON BOSCO - BARRIO CENTRO', 'ARH+'),
('1400373592', 'MIRANDA', 'JHONY', '1992-02-19', 'MASCULINO', 'SOLTERO', '0999124586', 'jhony@hotmail.com', 'RIOBAMBA - CHAMBO', 'TIPO DE SANGRE ORH+');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `receta_cod` int(11) NOT NULL,
  `paciente_ced` varchar(10) NOT NULL,
  `medico_cod` varchar(10) NOT NULL,
  `receta_fec` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de registro',
  `receta_pres` varchar(100) NOT NULL COMMENT 'Prescripcion',
  `receta_indi` varchar(100) NOT NULL COMMENT 'Indicaciones'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`receta_cod`, `paciente_ced`, `medico_cod`, `receta_fec`, `receta_pres`, `receta_indi`) VALUES
(1, '1400373578', '0103458519', '2023-07-04 19:37:56', 'BUPREX JARABE 60ML', 'BUPREX JARABE - Tomar una cucharadita cada 8 horas.'),
(4, '1400373583', '0103458519', '2023-07-05 12:24:29', 'asdsadsa', 'adasdsa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRoles` int(11) NOT NULL,
  `Detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRoles`, `Detalle`) VALUES
(1, 'Administrador'),
(13, 'invitado2'),
(14, 'Invitado4'),
(18, 'invitado5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signosvitales`
--

CREATE TABLE `signosvitales` (
  `signos_cod` int(11) NOT NULL,
  `paciente_ced` varchar(10) NOT NULL,
  `signos_fec` datetime NOT NULL DEFAULT current_timestamp(),
  `signos_tem` varchar(10) NOT NULL COMMENT 'temperatura de paciente',
  `signos_pre` varchar(10) NOT NULL COMMENT 'presion alterial de paciente',
  `signos_pes` varchar(10) NOT NULL COMMENT 'peso de paciente',
  `signos_talla` varchar(10) NOT NULL COMMENT 'talla del paciente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `signosvitales`
--

INSERT INTO `signosvitales` (`signos_cod`, `paciente_ced`, `signos_fec`, `signos_tem`, `signos_pre`, `signos_pes`, `signos_talla`) VALUES
(1, '1400373583', '2023-07-03 14:51:28', '35 grados', '90/150', '80 kg', '1.60'),
(3, '1400373578', '2023-07-03 18:27:59', '30', '90/180', '80 kg', '180'),
(4, '1400373592', '2023-07-03 21:14:59', '30', '90/180', '95KG', '180'),
(6, '1400373583', '2023-07-03 21:43:13', '45', '90/150', '80 kg', '165'),
(8, '1400373583', '2023-07-05 14:56:12', '50', '90/150', '70', '190');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsaurio` int(11) NOT NULL,
  `Nombres` text NOT NULL,
  `Apellidos` text NOT NULL,
  `contrasenia` text NOT NULL,
  `correo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsaurio`, `Nombres`, `Apellidos`, `contrasenia`, `correo`) VALUES
(1, 'wilmer', 'ayuy', '123', 'adminis'),
(8, 'juan', 'Gomez', '123456', 'wilmerayuy@gmail.com'),
(13, 'invitado4', 'invitado4', '123', 'invitado4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_roles`
--

CREATE TABLE `usuarios_roles` (
  `idUsuarios_Roles` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idRoles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios_roles`
--

INSERT INTO `usuarios_roles` (`idUsuarios_Roles`, `idUsuario`, `idRoles`) VALUES
(8, 8, 1),
(9, 1, 1),
(15, 13, 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`historial_cod`),
  ADD KEY `pacced_idx` (`paciente_ced`),
  ADD KEY `medcod_idx` (`medico_cod`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`medico_cod`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`paciente_ced`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`receta_cod`),
  ADD KEY `ced_idx` (`paciente_ced`),
  ADD KEY `medicoCod_idx` (`medico_cod`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRoles`);

--
-- Indices de la tabla `signosvitales`
--
ALTER TABLE `signosvitales`
  ADD PRIMARY KEY (`signos_cod`),
  ADD KEY `paciente_idx` (`paciente_ced`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsaurio`);

--
-- Indices de la tabla `usuarios_roles`
--
ALTER TABLE `usuarios_roles`
  ADD PRIMARY KEY (`idUsuarios_Roles`),
  ADD KEY `UR_Usuarios` (`idUsuario`),
  ADD KEY `UR?Roles` (`idRoles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `historial_cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `receta_cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRoles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `signosvitales`
--
ALTER TABLE `signosvitales`
  MODIFY `signos_cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsaurio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios_roles`
--
ALTER TABLE `usuarios_roles`
  MODIFY `idUsuarios_Roles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`paciente_ced`) REFERENCES `pacientes` (`paciente_ced`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`medico_cod`) REFERENCES `medico` (`medico_cod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`medico_cod`) REFERENCES `medico` (`medico_cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recetas_ibfk_2` FOREIGN KEY (`paciente_ced`) REFERENCES `pacientes` (`paciente_ced`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `signosvitales`
--
ALTER TABLE `signosvitales`
  ADD CONSTRAINT `signosvitales_ibfk_1` FOREIGN KEY (`paciente_ced`) REFERENCES `pacientes` (`paciente_ced`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_roles`
--
ALTER TABLE `usuarios_roles`
  ADD CONSTRAINT `UR?Roles` FOREIGN KEY (`idRoles`) REFERENCES `roles` (`idRoles`),
  ADD CONSTRAINT `UR_Usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsaurio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
