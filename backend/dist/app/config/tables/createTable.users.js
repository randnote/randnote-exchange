"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsers = void 0;
// admins table:
exports.createUsers = "create table if not exists users(\n    id int primary key auto_increment,\n    firstname int not null,\n    lastname varchar(200)not null,\n    email varchar(200)not null,\n    verifiedemail varchar(255) not null\n)";
//# sourceMappingURL=createTable.users.js.map