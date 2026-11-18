-- =====================================================================
-- Café Aroma - Base de datos MySQL
-- Ejecutar con:  mysql -u root < database/cafeteria.sql
-- =====================================================================

CREATE DATABASE IF NOT EXISTS cafeteria
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cafeteria;

SET NAMES utf8mb4;

-- Se recrean las tablas para poder volver a ejecutar el script sin errores
DROP TABLE IF EXISTS mensajes_contacto;
DROP TABLE IF EXISTS fotos_tienda;
DROP TABLE IF EXISTS precios;
DROP TABLE IF EXISTS especialidades;
DROP TABLE IF EXISTS servicios;
DROP TABLE IF EXISTS horarios;
DROP TABLE IF EXISTS secciones;
DROP TABLE IF EXISTS cafeteria_info;

-- ---------------------------------------------------------------------
-- Datos generales de la cafetería (una sola fila)
-- ---------------------------------------------------------------------
CREATE TABLE cafeteria_info (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  eslogan VARCHAR(150) NOT NULL,
  titulo_inicio VARCHAR(150) NOT NULL,
  subtitulo_inicio VARCHAR(255) NOT NULL,
  video_inicio VARCHAR(100) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  historia TEXT NOT NULL,
  latitud DECIMAL(9,6) DEFAULT NULL,
  longitud DECIMAL(9,6) DEFAULT NULL,
  saludo_chatbot VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Títulos de cada sección y texto del menú de navegación
-- ---------------------------------------------------------------------
CREATE TABLE secciones (
  id INT NOT NULL AUTO_INCREMENT,
  clave VARCHAR(30) NOT NULL,
  menu VARCHAR(40) NOT NULL,
  antetitulo VARCHAR(100) DEFAULT NULL,
  titulo VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_secciones_clave (clave)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Horarios de atención
-- ---------------------------------------------------------------------
CREATE TABLE horarios (
  id INT NOT NULL AUTO_INCREMENT,
  dia VARCHAR(50) NOT NULL,
  horario VARCHAR(50) NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Servicios que ofrece la cafetería
-- ---------------------------------------------------------------------
CREATE TABLE servicios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  icono VARCHAR(10) NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Especialidades de la casa
-- ---------------------------------------------------------------------
CREATE TABLE especialidades (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  imagen VARCHAR(100) DEFAULT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Lista de precios (en bolivianos)
-- ---------------------------------------------------------------------
CREATE TABLE precios (
  id INT NOT NULL AUTO_INCREMENT,
  categoria VARCHAR(60) NOT NULL,
  producto VARCHAR(100) NOT NULL,
  descripcion VARCHAR(150) DEFAULT NULL,
  precio DECIMAL(8,2) NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Fotos de la tienda (sección Nosotros)
-- ---------------------------------------------------------------------
CREATE TABLE fotos_tienda (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  archivo VARCHAR(100) NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- Mensajes enviados desde el formulario de contacto
-- ---------------------------------------------------------------------
CREATE TABLE mensajes_contacto (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  asunto VARCHAR(150) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_creacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- DATOS DE EJEMPLO
-- =====================================================================

INSERT INTO cafeteria_info
  (nombre, eslogan, titulo_inicio, subtitulo_inicio, video_inicio, direccion, ciudad,
   telefono, correo, historia, latitud, longitud, saludo_chatbot)
VALUES
  ('Café Aroma',
   'El aroma que te despierta',
   'Café de origen, momentos con alma',
   'Granos bolivianos tostados cada semana, repostería artesanal y un rincón cálido en el corazón de Cochabamba.',
   'inicio.mp4',
   'Av. Heroínas #456, esquina calle Ecuador',
   'Cochabamba, Bolivia',
   '+591 4 428 1234',
   'hola@cafearoma.bo',
   'Café Aroma nació en 2015 de una idea sencilla: servir en Cochabamba el café que crece en los Yungas de nuestro propio país. Todo empezó en un local de apenas seis mesas, con una tostadora pequeña y mucha curiosidad. Hoy trabajamos directamente con familias caficultoras de Caranavi y Coroico, tostamos cada semana en la tienda y preparamos todo con la paciencia que merece un buen café. Nuestra repostería se hornea cada madrugada y nuestro equipo de baristas se capacita todo el año. Creemos que una cafetería es, ante todo, un lugar para encontrarse: por eso en Café Aroma siempre hay una mesa esperando por ti.',
   -17.393800,
   -66.156900,
   '¡Hola! ☕ Soy el asistente de Café Aroma. Pregúntame por el menú, precios, horarios o servicios.');

INSERT INTO secciones (clave, menu, antetitulo, titulo, descripcion, orden) VALUES
  ('inicio',         'Inicio',         NULL,                         'Inicio',          NULL, 1),
  ('servicios',      'Servicios',      'Todo para disfrutar',        'Nuestros servicios',
     'Desde el café de la mañana hasta eventos a medida: esto es lo que hacemos por ti.', 2),
  ('especialidades', 'Especialidades', 'Lo mejor de la casa',        'Nuestras especialidades',
     'Preparaciones que nos hacen únicos, hechas con granos de origen boliviano.', 3),
  ('nosotros',       'Nosotros',       'Conócenos',                  'Nuestra historia',
     'Un rincón de Cochabamba pensado para quedarse un rato más.', 4),
  ('precios',        'Precios',        'Claros y justos',            'Nuestros precios',
     'Precios en bolivianos (Bs). Todos los productos se preparan al momento.', 5),
  ('contacto',       'Contacto',       'Hablemos',                   'Contáctanos',
     'Escríbenos para reservas, pedidos especiales o cualquier duda. Te respondemos pronto.', 6);

INSERT INTO horarios (dia, horario, orden) VALUES
  ('Lunes a viernes', '07:00 – 21:00', 1),
  ('Sábado',          '08:00 – 22:00', 2),
  ('Domingo',         '09:00 – 18:00', 3);

INSERT INTO servicios (nombre, descripcion, icono, orden) VALUES
  ('Café para llevar',       'Tu bebida favorita lista en minutos, en vaso reutilizable si lo traes.', '🥤', 1),
  ('Desayunos y brunch',     'Menús completos de mañana: huevos, tostadas, salteñas y jugos naturales.', '🍳', 2),
  ('Repostería por encargo', 'Tortas, tartas y cupcakes artesanales para cumpleaños y celebraciones.',     '🎂', 3),
  ('Catering para eventos',  'Estación de café y bocadillos para reuniones de trabajo y fiestas.',        '🎉', 4),
  ('Wi-Fi y coworking',      'Internet rápido, enchufes en cada mesa y un ambiente tranquilo para trabajar.', '💻', 5),
  ('Talleres de barismo',    'Aprende a preparar espresso, latte art y métodos filtrados con nuestros baristas.', '🎓', 6),
  ('Café en grano',          'Lleva a casa nuestro café tostado en la semana, entero o molido a tu gusto.', '🫘', 7),
  ('Delivery',               'Entregamos en el centro y zonas cercanas, de lunes a sábado.',               '🛵', 8);

INSERT INTO especialidades (nombre, descripcion, imagen, orden) VALUES
  ('Espresso doble',        'Intenso y con crema espesa, extraído con granos de los Yungas.',               'espresso.jpg', 1),
  ('Capuchino cremoso',     'Espresso, leche vaporizada y espuma sedosa con un toque de cacao.',            'capuchino.jpg', 2),
  ('Latte art',             'Café con leche texturizada y diseños hechos a mano por nuestros baristas.',    'latte-art.jpg', 3),
  ('Cold brew',             'Infusión en frío durante 18 horas: suave, dulce y muy refrescante.',           'cold-brew.jpg', 4),
  ('Café de Yungas V60',    'Método filtrado de origen único, con notas de chocolate y frutos rojos.',      'yungas.jpg', 5),
  ('Repostería artesanal',  'Brownies, tartas y galletas horneadas cada madrugada en nuestra cocina.',      'reposteria.jpg', 6);

INSERT INTO precios (categoria, producto, descripcion, precio, orden) VALUES
  ('Bebidas calientes', 'Espresso',          'Simple o doble',                         12.00, 1),
  ('Bebidas calientes', 'Americano',         'Espresso con agua caliente',             14.00, 2),
  ('Bebidas calientes', 'Capuchino',         'Con espuma de leche y cacao',            18.00, 3),
  ('Bebidas calientes', 'Latte',             'Suave y cremoso',                        20.00, 4),
  ('Bebidas calientes', 'Chocolate caliente','Chocolate boliviano al 60%',             20.00, 5),
  ('Bebidas frías',     'Cold brew',         'Infusión en frío 18 horas',              22.00, 1),
  ('Bebidas frías',     'Café frappé',       'Café, hielo y crema batida',             24.00, 2),
  ('Bebidas frías',     'Limonada de menta', 'Natural, sin colorantes',                15.00, 3),
  ('Repostería',        'Brownie',           'Con nueces',                             15.00, 1),
  ('Repostería',        'Tarta de queso',    'Con salsa de frutos rojos',              22.00, 2),
  ('Repostería',        'Croissant',         'Simple o relleno',                       12.00, 3),
  ('Repostería',        'Salteña',           'Horneada cada mañana',                   10.00, 4),
  ('Desayunos',         'Desayuno continental','Café, jugo, tostadas y mermelada',     35.00, 1),
  ('Desayunos',         'Huevos al gusto',   'Con pan y bebida caliente',              32.00, 2),
  ('Café en grano',     'Yungas 250 g',      'Tostado medio, entero o molido',         55.00, 1),
  ('Café en grano',     'Yungas 500 g',      'Tostado medio, entero o molido',         100.00, 2);

INSERT INTO fotos_tienda (titulo, archivo, orden) VALUES
  ('Fachada de Café Aroma',     'tienda-fachada.jpg', 1),
  ('Nuestro salón principal',   'tienda-interior.jpg', 2),
  ('La barra de baristas',      'tienda-barra.jpg', 3),
  ('Mesas junto a la ventana',  'tienda-mesas.jpg', 4),
  ('Preparando tu café',        'tienda-barista.jpg', 5),
  ('Terraza',                   'tienda-terraza.jpg', 6);
