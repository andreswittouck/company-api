"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const data_sourse_1 = require("./database/data-sourse");
dotenv.config();
async function bootstrap() {
    await data_sourse_1.AppDataSource.initialize();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log(`🚀 Application is running on: http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map