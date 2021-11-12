DROP DATABASE luz_db;
CREATE DATABASE luz_db;
USE luz_db;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-10-22 20:46:54.238

-- tables
-- Table: Distribuidor
CREATE TABLE Distribuidor (
    id_distribuidor int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    CONSTRAINT Distribuidor_pk PRIMARY KEY (id_distribuidor)
);

-- Table: Factura
CREATE TABLE Factura (
    id_factura int NOT NULL AUTO_INCREMENT,
    id_usuario int NOT NULL,
    id_distribuidor int NOT NULL,
    kwh int NOT NULL,
    multiplicador int NOT NULL,
    dias_facturados int NOT NULL,
    mes_facturado date NOT NULL,
    tipo_uso varchar(255) NULL,
    cargo_distribucion decimal(9,6) NOT NULL,
    cargo_comercializacion decimal(9,6) NOT NULL,
    cobro_desde date NOT NULL,
    cobro_hasta date NOT NULL,
    estado bool NOT NULL DEFAULT 1,
    CONSTRAINT Factura_pk PRIMARY KEY (id_factura)
);

-- Table: FacturaGrande
CREATE TABLE FacturaGrande (
    id_factura_grande int NOT NULL AUTO_INCREMENT,
    id_factura int NOT NULL,
    CONSTRAINT FacturaGrande_pk PRIMARY KEY (id_factura_grande)
);

-- Table: FacturaMediana
CREATE TABLE FacturaMediana (
    id_factura_mediana int NOT NULL AUTO_INCREMENT,
    id_factura int NOT NULL,
    CONSTRAINT FacturaMediana_pk PRIMARY KEY (id_factura_mediana)
);

-- Table: FacturaPequenia
CREATE TABLE FacturaPequenia (
    id_factura_pequenia int NOT NULL AUTO_INCREMENT,
    id_factura int NOT NULL,
    cargo_energia decimal(9,6) NOT NULL,
    CONSTRAINT FacturaPequenia_pk PRIMARY KEY (id_factura_pequenia)
);

-- Table: GranDemanda
CREATE TABLE GranDemanda (
    id_gran int NOT NULL AUTO_INCREMENT,
    id_pliego int NOT NULL,
    id_distribuidor int NOT NULL,
    cargo_punta decimal(9,6) NOT NULL,
    cargo_resto decimal(9,6) NOT NULL,
    cargo_valle decimal(9,6) NOT NULL,
    CONSTRAINT GranDemanda_pk PRIMARY KEY (id_gran)
);

-- Table: MedianaDemanda
CREATE TABLE MedianaDemanda (
    id_mediana int NOT NULL AUTO_INCREMENT,
    id_pliego int NOT NULL,
    id_distribuidor int NOT NULL,
    tension varchar(255) NOT NULL,
    medicion varchar(255) NOT NULL,
    cargo_punta decimal(9,6) NOT NULL,
    cargo_resto decimal(9,6) NOT NULL,
    cargo_valle decimal(9,6) NOT NULL,
    CONSTRAINT MedianaDemanda_pk PRIMARY KEY (id_mediana)
);

-- Table: PequeniaDemanda
CREATE TABLE PequeniaDemanda (
    id_pequenia int NOT NULL AUTO_INCREMENT,
    id_pliego int NOT NULL,
    id_distribuidor int NOT NULL,
    bloque int NOT NULL,
    cargo_energia decimal(9,6) NOT NULL,
    cargo_distribucion decimal(9,6) NOT NULL,
    cargo_comercializacion decimal(9,6) NOT NULL,
    tipo_demanda varchar(255) NOT NULL,
    CONSTRAINT PequeniaDemanda_pk PRIMARY KEY (id_pequenia)
);

-- Table: Pliego
CREATE TABLE Pliego (
    id_pliego int NOT NULL AUTO_INCREMENT,
    fecha_inicio date NOT NULL,
    fecha_caduca date NOT NULL,
    CONSTRAINT Pliego_pk PRIMARY KEY (id_pliego)
);

-- Table: Usuario
CREATE TABLE Usuario (
    id_usuario int NOT NULL,
    correo varchar(255) NOT NULL,
    contrasenia varchar(255) NOT NULL,
    administrador bool NOT NULL,
    estado bool NOT NULL DEFAULT 1,
    CONSTRAINT Usuario_pk PRIMARY KEY (id_usuario)
);

-- foreign keys
-- Reference: FacturaGrande_Factura (table: FacturaGrande)
ALTER TABLE FacturaGrande ADD CONSTRAINT FacturaGrande_Factura FOREIGN KEY FacturaGrande_Factura (id_factura)
    REFERENCES Factura (id_factura);

-- Reference: FacturaMediana_Factura (table: FacturaMediana)
ALTER TABLE FacturaMediana ADD CONSTRAINT FacturaMediana_Factura FOREIGN KEY FacturaMediana_Factura (id_factura)
    REFERENCES Factura (id_factura);

-- Reference: FacturaPequenia_Factura (table: FacturaPequenia)
ALTER TABLE FacturaPequenia ADD CONSTRAINT FacturaPequenia_Factura FOREIGN KEY FacturaPequenia_Factura (id_factura)
    REFERENCES Factura (id_factura);

-- Reference: Factura_Distribuidor (table: Factura)
ALTER TABLE Factura ADD CONSTRAINT Factura_Distribuidor FOREIGN KEY Factura_Distribuidor (id_distribuidor)
    REFERENCES Distribuidor (id_distribuidor);

-- Reference: Factura_Usuario (table: Factura)
ALTER TABLE Factura ADD CONSTRAINT Factura_Usuario FOREIGN KEY Factura_Usuario (id_usuario)
    REFERENCES Usuario (id_usuario);

-- Reference: GranDemanda_Distribuidor (table: GranDemanda)
ALTER TABLE GranDemanda ADD CONSTRAINT GranDemanda_Distribuidor FOREIGN KEY GranDemanda_Distribuidor (id_distribuidor)
    REFERENCES Distribuidor (id_distribuidor);

-- Reference: GranDemanda_Pliego (table: GranDemanda)
ALTER TABLE GranDemanda ADD CONSTRAINT GranDemanda_Pliego FOREIGN KEY GranDemanda_Pliego (id_pliego)
    REFERENCES Pliego (id_pliego);

-- Reference: MedianaDemanda_Distribuidor (table: MedianaDemanda)
ALTER TABLE MedianaDemanda ADD CONSTRAINT MedianaDemanda_Distribuidor FOREIGN KEY MedianaDemanda_Distribuidor (id_distribuidor)
    REFERENCES Distribuidor (id_distribuidor);

-- Reference: MedianaDemanda_Pliego (table: MedianaDemanda)
ALTER TABLE MedianaDemanda ADD CONSTRAINT MedianaDemanda_Pliego FOREIGN KEY MedianaDemanda_Pliego (id_pliego)
    REFERENCES Pliego (id_pliego);

-- Reference: PequeniaDemanda_Distribuidor (table: PequeniaDemanda)
ALTER TABLE PequeniaDemanda ADD CONSTRAINT PequeniaDemanda_Distribuidor FOREIGN KEY PequeniaDemanda_Distribuidor (id_distribuidor)
    REFERENCES Distribuidor (id_distribuidor);

-- Reference: PequeniaDemanda_Pliego (table: PequeniaDemanda)
ALTER TABLE PequeniaDemanda ADD CONSTRAINT PequeniaDemanda_Pliego FOREIGN KEY PequeniaDemanda_Pliego (id_pliego)
    REFERENCES Pliego (id_pliego);

-- End of file.

-- DATOS PRUEBA
INSERT INTO Usuario(
  id_usuario, correo, contrasenia, administrador
) 
VALUES 
  (
    654321, 'admin@admin.com', '$2b$05$2mAUAwZSJ/pYdqtwEx0Luuo1VE3MCCdiQkH2ybmxdMhFpIXbvlDB2', 1
  );

INSERT INTO Usuario(
  id_usuario, correo, contrasenia, administrador
) 
VALUES 
  (
    123456, 'test@test.com', '$2b$05$2mAUAwZSJ/pYdqtwEx0Luuo1VE3MCCdiQkH2ybmxdMhFpIXbvlDB2', 0
  );

INSERT INTO Distribuidor 
VALUES 
  (1, 'CAESS'), 
  (2, 'DEL SUR'), 
  (3, 'CLESA'), 
  (4, 'EEO'), 
  (5, 'DEUSEM'), 
  (6, 'EDESAL'), 
  (7, 'B&D'), 
  (8, 'ABRUZZO');


INSERT INTO Pliego 
VALUES 
  (2, '2020-10-15', '2021-01-14'), 
  (3, '2021-04-15', '2021-07-14'), 
  (4, '2021-07-15', '2021-10-14'), 
  (5, '2021-10-15', '2022-01-14'), 
  (6, '2022-01-15', '2022-04-14');

INSERT INTO PequeniaDemanda 
VALUES 
  (
    1, 2, 1, 1, 0.128213, 0.030763, 0.820072, 
    'residencial'
  ), 
  (
    2, 2, 2, 1, 0.122260, 0.050362, 0.958559, 
    'residencial'
  ), 
  (
    3, 2, 3, 1, 0.131431, 0.063262, 0.751491, 
    'residencial'
  ), 
  (
    4, 2, 4, 1, 0.132505, 0.067610, 0.873825, 
    'residencial'
  ), 
  (
    5, 2, 5, 1, 0.134900, 0.079250, 0.795431, 
    'residencial'
  ), 
  (
    6, 2, 6, 1, 0.117285, 0.065277, 2.281396, 
    'residencial'
  ), 
  (
    7, 2, 7, 1, 0.124792, 0.039451, 0.830061, 
    'residencial'
  ), 
  (
    8, 2, 8, 1, 0.083674, 0.037370, 0.886037, 
    'residencial'
  ), 
  (
    9, 2, 1, 2, 0.127429, 0.033589, 0.820072, 
    'residencial'
  ), 
  (
    10, 2, 2, 2, 0.121479, 0.060333, 0.958559, 
    'residencial'
  ), 
  (
    11, 2, 3, 2, 0.130198, 0.028109, 0.751491, 
    'residencial'
  ), 
  (
    12, 2, 4, 2, 0.133239, 0.034937, 0.873825, 
    'residencial'
  ), 
  (
    13, 2, 5, 2, 0.135351, 0.037468, 0.795431, 
    'residencial'
  ), 
  (
    14, 2, 6, 2, 0.115915, 0.059994, 2.281396, 
    'residencial'
  ), 
  (
    15, 2, 7, 2, 0.124986, 0.034965, 0.830061, 
    'residencial'
  ), 
  (
    16, 2, 8, 2, 0.082470, 0.040903, 0.886037, 
    'residencial'
  ), 
  (
    18, 2, 1, 3, 0.125299, 0.042499, 0.820072, 
    'residencial'
  ), 
  (
    19, 2, 2, 3, 0.120697, 0.070778, 0.958559, 
    'residencial'
  ), 
  (
    20, 2, 3, 3, 0.129092, 0.079705, 0.751491, 
    'residencial'
  ), 
  (
    21, 2, 4, 3, 0.132886, 0.075238, 0.873825, 
    'residencial'
  ), 
  (
    22, 2, 5, 3, 0.134684, 0.080865, 0.795431, 
    'residencial'
  ), 
  (
    23, 2, 6, 3, 0.115015, 0.064626, 2.281396, 
    'residencial'
  ), 
  (
    24, 2, 7, 3, 0.124986, 0.036919, 0.830061, 
    'residencial'
  ), 
  (
    25, 2, 8, 3, 0.081527, 0.042581, 0.886037, 
    'residencial'
  ), 
  (
    26, 2, 1, 0, 0.124684, 0.034300, 0.820072, 
    'general'
  ), 
  (
    27, 2, 2, 0, 0.119996, 0.041926, 0.958559, 
    'general'
  ), 
  (
    28, 2, 3, 0, 0.126632, 0.039895, 0.751491, 
    'general'
  ), 
  (
    29, 2, 4, 0, 0.127820, 0.058997, 0.873825, 
    'general'
  ), 
  (
    30, 2, 5, 0, 0.127567, 0.062063, 0.795431, 
    'general'
  ), 
  (
    31, 2, 6, 0, 0.114192, 0.061159, 2.281396, 
    'general'
  ), 
  (
    32, 2, 7, 0, 0.121127, 0.036486, 0.830061, 
    'general'
  ), 
  (
    33, 2, 8, 0, 0.079960, 0.033686, 0.886037, 
    'general'
  ), 
  (
    34, 3, 1, 1, 0.140056, 0.030689, 0.816923, 
    'residencial'
  ), 
  (
    35, 3, 2, 1, 0.134696, 0.050241, 0.954878, 
    'residencial'
  ), 
  (
    36, 3, 3, 1, 0.143506, 0.063110, 0.748606, 
    'residencial'
  ), 
  (
    37, 3, 4, 1, 0.144195, 0.067449, 0.870470, 
    'residencial'
  ), 
  (
    38, 3, 5, 1, 0.146627, 0.079060, 0.792377, 
    'residencial'
  ), 
  (
    39, 3, 6, 1, 0.127217, 0.065119, 2.272636, 
    'residencial'
  ), 
  (
    40, 3, 7, 1, 0.132827, 0.039357, 0.826874, 
    'residencial'
  ), 
  (
    41, 3, 8, 1, 0.089287, 0.037298, 0.882635, 
    'residencial'
  ), 
  (
    42, 3, 1, 2, 0.139245, 0.033508, 0.816923, 
    'residencial'
  ), 
  (
    43, 3, 2, 2, 0.133890, 0.060188, 0.954878, 
    'residencial'
  ), 
  (
    44, 3, 3, 2, 0.142211, 0.028041, 0.748606, 
    'residencial'
  ), 
  (
    45, 3, 4, 2, 0.145027, 0.034854, 0.870470, 
    'residencial'
  ), 
  (
    46, 3, 5, 2, 0.147185, 0.037378, 0.792377, 
    'residencial'
  ), 
  (
    47, 3, 6, 2, 0.126060, 0.059850, 2.272636, 
    'residencial'
  ), 
  (
    48, 3, 7, 2, 0.132940, 0.034882, 0.826874, 
    'residencial'
  ), 
  (
    49, 3, 8, 2, 0.090623, 0.040825, 0.882635, 
    'residencial'
  ), 
  (
    50, 3, 1, 3, 0.136913, 0.042396, 0.816923, 
    'residencial'
  ), 
  (
    51, 3, 2, 3, 0.133035, 0.070608, 0.954878, 
    'residencial'
  ), 
  (
    52, 3, 3, 3, 0.140982, 0.079514, 0.748606, 
    'residencial'
  ), 
  (
    53, 3, 4, 3, 0.144703, 0.075058, 0.870470, 
    'residencial'
  ), 
  (
    54, 3, 5, 3, 0.146513, 0.080671, 0.792377, 
    'residencial'
  ), 
  (
    55, 3, 6, 3, 0.125073, 0.064471, 2.272636, 
    'residencial'
  ), 
  (
    56, 3, 7, 3, 0.132940, 0.036831, 0.826874, 
    'residencial'
  ), 
  (
    57, 3, 8, 3, 0.091054, 0.042499, 0.882635, 
    'residencial'
  ), 
  (
    58, 3, 1, 0, 0.136230, 0.034218, 0.816923, 
    'general'
  ), 
  (
    59, 3, 2, 0, 0.132232, 0.041825, 0.954878, 
    'general'
  ), 
  (
    60, 3, 3, 0, 0.138051, 0.039799, 0.748606, 
    'general'
  ), 
  (
    61, 3, 4, 0, 0.139338, 0.058856, 0.870470, 
    'general'
  ), 
  (
    62, 3, 5, 0, 0.138915, 0.061915, 0.792377, 
    'general'
  ), 
  (
    63, 3, 6, 0, 0.123360, 0.061011, 2.272636, 
    'general'
  ), 
  (
    64, 3, 7, 0, 0.126830, 0.036399, 0.826874, 
    'general'
  ), 
  (
    65, 3, 8, 0, 0.089142, 0.033622, 0.882635, 
    'general'
  ), 
  (
    66, 4, 1, 1, 0.149435, 0.030689, 0.816923, 
    'residencial'
  ), 
  (
    67, 4, 2, 1, 0.158175, 0.050241, 0.954878, 
    'residencial'
  ), 
  (
    68, 4, 3, 1, 0.157365, 0.063110, 0.748606, 
    'residencial'
  ), 
  (
    69, 4, 4, 1, 0.157690, 0.067449, 0.870470, 
    'residencial'
  ), 
  (
    70, 4, 5, 1, 0.164433, 0.079060, 0.792377, 
    'residencial'
  ), 
  (
    71, 4, 6, 1, 0.153466, 0.065119, 2.272636, 
    'residencial'
  ), 
  (
    72, 4, 7, 1, 0.135047, 0.039357, 0.826874, 
    'residencial'
  ), 
  (
    73, 4, 8, 1, 0.147189, 0.037298, 0.882635, 
    'residencial'
  ), 
  (
    74, 4, 1, 2, 0.148482, 0.033508, 0.816923, 
    'residencial'
  ), 
  (
    75, 4, 2, 2, 0.157062, 0.060188, 0.954878, 
    'residencial'
  ), 
  (
    76, 4, 3, 2, 0.155786, 0.028041, 0.748606, 
    'residencial'
  ), 
  (
    77, 4, 4, 2, 0.158609, 0.034854, 0.870470, 
    'residencial'
  ), 
  (
    78, 4, 5, 2, 0.165024, 0.037378, 0.792377, 
    'residencial'
  ), 
  (
    79, 4, 6, 2, 0.151909, 0.059850, 2.272636, 
    'residencial'
  ), 
  (
    80, 4, 7, 2, 0.135212, 0.034882, 0.826874, 
    'residencial'
  ), 
  (
    81, 4, 8, 2, 0.146825, 0.040825, 0.882635, 
    'residencial'
  ), 
  (
    82, 4, 1, 3, 0.145796, 0.042396, 0.816923, 
    'residencial'
  ), 
  (
    83, 4, 2, 3, 0.155895, 0.070608, 0.954878, 
    'residencial'
  ), 
  (
    84, 4, 3, 3, 0.154330, 0.079514, 0.748606, 
    'residencial'
  ), 
  (
    85, 4, 4, 3, 0.158232, 0.075058, 0.870470, 
    'residencial'
  ), 
  (
    86, 4, 5, 3, 0.164293, 0.080671, 0.792377, 
    'residencial'
  ), 
  (
    87, 4, 6, 3, 0.150723, 0.064471, 2.272636, 
    'residencial'
  ), 
  (
    88, 4, 7, 3, 0.135212, 0.036831, 0.826874, 
    'residencial'
  ), 
  (
    89, 4, 8, 3, 0.146628, 0.042499, 0.882635, 
    'residencial'
  ), 
  (
    90, 4, 1, 0, 0.145013, 0.034218, 0.816923, 
    'general'
  ), 
  (
    91, 4, 2, 0, 0.154809, 0.041825, 0.954878, 
    'general'
  ), 
  (
    92, 4, 3, 0, 0.150973, 0.039799, 0.748606, 
    'general'
  ), 
  (
    93, 4, 4, 0, 0.152217, 0.058856, 0.870470, 
    'general'
  ), 
  (
    94, 4, 5, 0, 0.156090, 0.061915, 0.792377, 
    'general'
  ), 
  (
    95, 4, 6, 0, 0.149060, 0.061011, 2.272636, 
    'general'
  ), 
  (
    96, 4, 7, 0, 0.126894, 0.036399, 0.826874, 
    'general'
  ), 
  (
    97, 4, 8, 0, 0.146674, 0.033622, 0.882635, 
    'general'
  ), 
  (
    98, 5, 1, 1, 0.152758, 0.030689, 0.816923, 
    'residencial'
  ), 
  (
    99, 5, 2, 1, 0.151513, 0.050241, 0.954878, 
    'residencial'
  ), 
  (
    100, 5, 3, 1, 0.160601, 0.063110, 0.748606, 
    'residencial'
  ), 
  (
    101, 5, 4, 1, 0.159046, 0.067449, 0.870470, 
    'residencial'
  ), 
  (
    102, 5, 5, 1, 0.162646, 0.079060, 0.792377, 
    'residencial'
  ), 
  (
    103, 5, 6, 1, 0.138493, 0.065119, 2.272636, 
    'residencial'
  ), 
  (
    104, 5, 7, 1, 0.148295, 0.039357, 0.826874, 
    'residencial'
  ), 
  (
    105, 5, 8, 1, 0.152480, 0.037298, 0.882635, 
    'residencial'
  ), 
  (
    106, 5, 1, 2, 0.151727, 0.033508, 0.816923, 
    'residencial'
  ), 
  (
    107, 5, 2, 2, 0.150119, 0.060188, 0.954878, 
    'residencial'
  ), 
  (
    108, 5, 3, 2, 0.158772, 0.028041, 0.748606, 
    'residencial'
  ), 
  (
    109, 5, 4, 2, 0.159444, 0.034854, 0.870470, 
    'residencial'
  ), 
  (
    110, 5, 5, 2, 0.162869, 0.037378, 0.792377, 
    'residencial'
  ), 
  (
    111, 5, 6, 2, 0.136706, 0.059850, 2.272636, 
    'residencial'
  ), 
  (
    112, 5, 7, 2, 0.149017, 0.034882, 0.826874, 
    'residencial'
  ), 
  (
    113, 5, 8, 2, 0.151447, 0.040825, 0.882635, 
    'residencial'
  ), 
  (
    114, 5, 1, 3, 0.149355, 0.042396, 0.816923, 
    'residencial'
  ), 
  (
    115, 5, 2, 3, 0.148829, 0.070608, 0.954878, 
    'residencial'
  ), 
  (
    116, 5, 3, 3, 0.157309, 0.079514, 0.748606, 
    'residencial'
  ), 
  (
    117, 5, 4, 3, 0.158982, 0.075058, 0.870470, 
    'residencial'
  ), 
  (
    118, 5, 5, 3, 0.162189, 0.080671, 0.792377, 
    'residencial'
  ), 
  (
    119, 5, 6, 3, 0.134704, 0.064471, 2.272636, 
    'residencial'
  ), 
  (
    120, 5, 7, 3, 0.149017, 0.036831, 0.826874, 
    'residencial'
  ), 
  (
    121, 5, 8, 3, 0.150761, 0.042499, 0.882635, 
    'residencial'
  ), 
  (
    122, 5, 1, 0, 0.148704, 0.034218, 0.816923, 
    'general'
  ), 
  (
    123, 5, 2, 0, 0.147763, 0.041825, 0.954878, 
    'general'
  ), 
  (
    124, 5, 3, 0, 0.154584, 0.039799, 0.748606, 
    'general'
  ), 
  (
    125, 5, 4, 0, 0.154885, 0.058856, 0.870470, 
    'general'
  ), 
  (
    126, 5, 5, 0, 0.155902, 0.061915, 0.792377, 
    'general'
  ), 
  (
    127, 5, 6, 0, 0.133750, 0.061011, 2.272636, 
    'general'
  ), 
  (
    128, 5, 7, 0, 0.140697, 0.036399, 0.826874, 
    'general'
  ), 
  (
    129, 5, 8, 0, 0.150149, 0.033622, 0.882635, 
    'general'
  ), 
  (
    131, 6, 1, 1, 0.125185, 0.030689, 0.816923, 
    'residencial'
  ), 
  (
    132, 6, 2, 1, 0.120132, 0.050241, 0.954878, 
    'residencial'
  ), 
  (
    133, 6, 3, 1, 0.130571, 0.063110, 0.748606, 
    'residencial'
  ), 
  (
    134, 6, 4, 1, 0.132631, 0.067449, 0.870470, 
    'residencial'
  ), 
  (
    135, 6, 5, 1, 0.133927, 0.079060, 0.792377, 
    'residencial'
  ), 
  (
    136, 6, 6, 1, 0.115357, 0.065119, 2.272636, 
    'residencial'
  ), 
  (
    137, 6, 7, 1, 0.117084, 0.039357, 0.826874, 
    'residencial'
  ), 
  (
    138, 6, 8, 1, 0.082290, 0.037298, 0.882635, 
    'residencial'
  ), 
  (
    139, 6, 1, 2, 0.124538, 0.033508, 0.816923, 
    'residencial'
  ), 
  (
    140, 6, 2, 2, 0.119444, 0.060188, 0.954878, 
    'residencial'
  ), 
  (
    141, 6, 3, 2, 0.129496, 0.028041, 0.748606, 
    'residencial'
  ), 
  (
    142, 6, 4, 2, 0.133098, 0.034854, 0.870470, 
    'residencial'
  ), 
  (
    143, 6, 5, 2, 0.134222, 0.037378, 0.792377, 
    'residencial'
  ), 
  (
    144, 6, 6, 2, 0.113893, 0.059850, 2.272636, 
    'residencial'
  ), 
  (
    145, 6, 7, 2, 0.117522, 0.034882, 0.826874, 
    'residencial'
  ), 
  (
    146, 6, 8, 2, 0.080942, 0.040825, 0.882635, 
    'residencial'
  ), 
  (
    147, 6, 1, 3, 0.122972, 0.042396, 0.816923, 
    'residencial'
  ), 
  (
    148, 6, 2, 3, 0.118789, 0.070608, 0.954878, 
    'residencial'
  ), 
  (
    149, 6, 3, 3, 0.128587, 0.079514, 0.748606, 
    'residencial'
  ), 
  (
    150, 6, 4, 3, 0.132797, 0.075058, 0.870470, 
    'residencial'
  ), 
  (
    151, 6, 5, 3, 0.133713, 0.080671, 0.792377, 
    'residencial'
  ), 
  (
    152, 6, 6, 3, 0.112953, 0.064471, 2.272636, 
    'residencial'
  ), 
  (
    153, 6, 7, 3, 0.117522, 0.036831, 0.826874, 
    'residencial'
  ), 
  (
    154, 6, 8, 3, 0.079928, 0.042499, 0.882635, 
    'residencial'
  ), 
  (
    155, 6, 1, 0, 0.122536, 0.034218, 0.816923, 
    'general'
  ), 
  (
    156, 6, 2, 0, 0.118231, 0.041825, 0.954878, 
    'general'
  ), 
  (
    157, 6, 3, 0, 0.126728, 0.039799, 0.748606, 
    'general'
  ), 
  (
    158, 6, 4, 0, 0.129199, 0.058856, 0.870470, 
    'general'
  ), 
  (
    159, 6, 5, 0, 0.128476, 0.061915, 0.792377, 
    'general'
  ), 
  (
    160, 6, 6, 0, 0.112410, 0.061011, 2.272636, 
    'general'
  ), 
  (
    161, 6, 7, 0, 0.113478, 0.036399, 0.826874, 
    'general'
  ), 
  (
    162, 6, 8, 0, 0.078426, 0.033622, 0.882635, 
    'general'
  );
