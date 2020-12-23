"use strict";
/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
// import { lstatSync, readdirSync } from 'fs';
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class HomeController {
    constructor() {
        // ---
    }
    home(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(req.env);
            const directoryPath = path.join(process.cwd(), 'plugins' + '/');
            const directoryList = yield fs.readdirSync(directoryPath);
            console.log(directoryList);
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginList = yield pluginRepository.find();
            for (const directory of directoryList) {
                console.log(directory);
                const index = pluginList.findIndex(p => p.pluginName.toLowerCase() === directory.toLowerCase());
                console.log(index);
                if (index === -1) {
                    const plugin = new Plugin_1.Plugins();
                    plugin.pluginName = directory;
                    plugin.pluginStatus = 0;
                    pluginList.push(plugin);
                }
            }
            console.log(pluginList);
            res.render('pages/home', {
                data: pluginList,
                title: 'Home Page',
            });
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map