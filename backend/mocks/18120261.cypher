CREATE (n:Address {id: 'ADR0', ward: 'Đống Đa', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR1', ward: 'Cầu Giấy', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR2', ward: 'Hà Đông', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR3', ward: 'Nam Từ Liêm', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR4', ward: 'Đông Anh', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR5', ward: 'Ba Đình', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR6', ward: 'Sơn Tây', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR7', ward: 'Long Biên', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR8', ward: 'Hoàn Kiếm', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR9', ward: 'Hai Bà Trưng', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR10', ward: 'Hoàng Mai', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR11', ward: 'Thanh Xuân', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR12', ward: 'Bắc Từ Liêm', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR13', ward: 'Tây Hồ', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR14', ward: 'Ba Vì', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR15', ward: 'Chương Mỹ', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR16', ward: 'Phúc Thọ', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR17', ward: 'Đan Phượng', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR18', ward: 'Gia Lâm', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR19', ward: 'Hoài Đức', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR20', ward: 'Mê Linh', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR21', ward: 'Mỹ Đức', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR22', ward: 'Phú Xuyên', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR23', ward: 'Quốc Oai', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR24', ward: 'Sóc Sơn', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR25', ward: 'Thạch Thất', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR26', ward: 'Thanh Oai', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR27', ward: 'Thường Tín', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR28', ward: 'Ứng Hòa', city: 'Hà Nội'});
CREATE (n:Address {id: 'ADR29', ward: 'Thanh Trì', city: 'Hà Nội'});

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR0' AND b.id= 'ADR5' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR0' AND b.id= 'ADR11' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR0' AND b.id= 'ADR9' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR0' AND b.id= 'ADR8' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR0' AND b.id= 'ADR1' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR1' AND b.id= 'ADR12' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR1' AND b.id= 'ADR3' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR1' AND b.id= 'ADR13' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR1' AND b.id= 'ADR5' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR1' AND b.id= 'ADR11' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR15' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR23' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR19' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR3' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR11' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR29' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR2' AND b.id= 'ADR26' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR3' AND b.id= 'ADR12' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR3' AND b.id= 'ADR5' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR3' AND b.id= 'ADR11' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR3' AND b.id= 'ADR19' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR18' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR7' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR5' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR13' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR12' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR17' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR20' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR4' AND b.id= 'ADR24' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR5' AND b.id= 'ADR13' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR5' AND b.id= 'ADR8' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR5' AND b.id= 'ADR7' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR6' AND b.id= 'ADR14' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR6' AND b.id= 'ADR25' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR6' AND b.id= 'ADR16' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR7' AND b.id= 'ADR18' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR7' AND b.id= 'ADR10' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR7' AND b.id= 'ADR9' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR7' AND b.id= 'ADR8' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR7' AND b.id= 'ADR13' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR8' AND b.id= 'ADR9' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR9' AND b.id= 'ADR11' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR9' AND b.id= 'ADR10' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR10' AND b.id= 'ADR29' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR12' AND b.id= 'ADR19' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR12' AND b.id= 'ADR17' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR12' AND b.id= 'ADR13' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR14' AND b.id= 'ADR25' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR15' AND b.id= 'ADR23' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR15' AND b.id= 'ADR26' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR15' AND b.id= 'ADR28' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR15' AND b.id= 'ADR21' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR16' AND b.id= 'ADR25' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR16' AND b.id= 'ADR17' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR16' AND b.id= 'ADR23' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR17' AND b.id= 'ADR20' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR17' AND b.id= 'ADR19' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR18' AND b.id= 'ADR29' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR19' AND b.id= 'ADR23' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR20' AND b.id= 'ADR24' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR21' AND b.id= 'ADR28' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR22' AND b.id= 'ADR26' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR22' AND b.id= 'ADR27' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR22' AND b.id= 'ADR28' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR23' AND b.id= 'ADR25' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR26' AND b.id= 'ADR27' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR26' AND b.id= 'ADR28' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR27' AND b.id= 'ADR29' CREATE (a)-[:NEAR]->(b);


CREATE (n:Address {id: 'ADR30', ward: 'Phú Nhuận', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR31', ward: 'Quận 2', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR32', ward: 'Quận 11', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR33', ward: 'Quận 12', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR34', ward: 'Thủ Đức', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR35', ward: 'Bình Chánh', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR36', ward: 'Bình Tân', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR37', ward: 'Quận 7', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR38', ward: 'Bình Thạnh', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR39', ward: 'Tân Phú', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR40', ward: 'Quận 1', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR41', ward: 'Quận 3', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR42', ward: 'Quận 4', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR43', ward: 'Quận 5', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR44', ward: 'Quận 6', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR45', ward: 'Quận 8', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR46', ward: 'Quận 10', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR47', ward: 'Gò Vấp', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR48', ward: 'Tân Bình', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR49', ward: 'Nhà Bè', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR50', ward: 'Hóc Môn', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR51', ward: 'Củ Chi', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR52', ward: 'Cần Giờ', city: 'Hồ Chí Minh'});
CREATE (n:Address {id: 'ADR53', ward: 'Quận 9', city: 'Hồ Chí Minh'});

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR30' AND b.id= 'ADR40' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR30' AND b.id= 'ADR41' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR30' AND b.id= 'ADR38' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR30' AND b.id= 'ADR47' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR30' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR34' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR38' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR40' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR42' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR53' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR31' AND b.id= 'ADR37' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR32' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR32' AND b.id= 'ADR39' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR32' AND b.id= 'ADR44' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR32' AND b.id= 'ADR43' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR32' AND b.id= 'ADR46' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR34' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR47' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR39' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR36' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR33' AND b.id= 'ADR50' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR34' AND b.id= 'ADR53' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR34' AND b.id= 'ADR38' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR34' AND b.id= 'ADR47' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR35' AND b.id= 'ADR50' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR35' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR35' AND b.id= 'ADR44' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR35' AND b.id= 'ADR49' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR35' AND b.id= 'ADR36' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR36' AND b.id= 'ADR50' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR36' AND b.id= 'ADR45' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR36' AND b.id= 'ADR44' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR36' AND b.id= 'ADR39' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR37' AND b.id= 'ADR45' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR37' AND b.id= 'ADR42' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR37' AND b.id= 'ADR53' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR37' AND b.id= 'ADR49' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR38' AND b.id= 'ADR47' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR38' AND b.id= 'ADR40' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR39' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR39' AND b.id= 'ADR44' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR40' AND b.id= 'ADR41' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR40' AND b.id= 'ADR43' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR40' AND b.id= 'ADR46' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR40' AND b.id= 'ADR42' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR41' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR41' AND b.id= 'ADR46' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR41' AND b.id= 'ADR43' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR42' AND b.id= 'ADR43' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR42' AND b.id= 'ADR45' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR43' AND b.id= 'ADR45' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR43' AND b.id= 'ADR44' CREATE (a)-[:NEAR]->(b);
MATCH (a:Address), (b:Address) WHERE a.id = 'ADR43' AND b.id= 'ADR46' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR44' AND b.id= 'ADR45' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR46' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR47' AND b.id= 'ADR48' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR49' AND b.id= 'ADR52' CREATE (a)-[:NEAR]->(b);

MATCH (a:Address), (b:Address) WHERE a.id = 'ADR50' AND b.id= 'ADR51' CREATE (a)-[:NEAR]->(b);

