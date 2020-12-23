"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const commander_1 = tslib_1.__importDefault(require("commander"));
const path = tslib_1.__importStar(require("path"));
const typeorm_seeding_1 = require("typeorm-seeding");
// Cli helper
commander_1.default
    .version('1.0.0')
    .description('Run database seeds of your project')
    .option('-L, --logging', 'enable sql query logging')
    .option('--factories <path>', 'add filepath for your factories')
    .option('--seeds <path>', 'add filepath for your seeds')
    .option('--run <seeds>', 'run specific seeds (file names without extension)', (val) => val.split(','))
    .option('--config <file>', 'path to your ormconfig.json file (must be a json)')
    .parse(process.argv);
// Get cli parameter for a different factory path
const factoryPath = (commander_1.default.factories)
    ? commander_1.default.factories
    : 'src/database/factories';
// Get cli parameter for a different seeds path
const seedsPath = (commander_1.default.seeds)
    ? commander_1.default.seeds
    : 'src/database/seeds/';
// Get a list of seeds
const listOfSeeds = (commander_1.default.run)
    ? commander_1.default.run.map(l => l.trim()).filter(l => l.length > 0)
    : [];
// Search for seeds and factories
const run = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const log = console.log;
    let factoryFiles;
    let seedFiles;
    try {
        factoryFiles = yield typeorm_seeding_1.loadEntityFactories(factoryPath);
        seedFiles = yield typeorm_seeding_1.loadSeeds(seedsPath);
    }
    catch (error) {
        return handleError(error);
    }
    // Filter seeds
    if (listOfSeeds.length > 0) {
        seedFiles = seedFiles.filter(sf => listOfSeeds.indexOf(path.basename(sf).replace('.ts', '')) >= 0);
    }
    // Status logging to print out the amount of factories and seeds.
    log(chalk_1.default.bold('seeds'));
    log('🔎 ', chalk_1.default.gray.underline(`found:`), chalk_1.default.blue.bold(`${factoryFiles.length} factories`, chalk_1.default.gray('&'), chalk_1.default.blue.bold(`${seedFiles.length} seeds`)));
    // Get database connection and pass it to the seeder
    try {
        const connection = yield typeorm_seeding_1.loadConnection();
        typeorm_seeding_1.setConnection(connection);
    }
    catch (error) {
        return handleError(error);
    }
    // Show seeds in the console
    for (const seedFile of seedFiles) {
        try {
            let className = seedFile.split('/')[seedFile.split('/').length - 1];
            className = className.replace('.ts', '').replace('.js', '');
            className = className.split('-')[className.split('-').length - 1];
            log('\n' + chalk_1.default.gray.underline(`executing seed:  `), chalk_1.default.green.bold(`${className}`));
            const seedFileObject = require(seedFile);
            yield typeorm_seeding_1.runSeed(seedFileObject[className]);
        }
        catch (error) {
            console.error('Could not run seed ', error);
            process.exit(1);
        }
    }
    log('\n👍 ', chalk_1.default.gray.underline(`finished seeding`));
    process.exit(0);
});
const handleError = (error) => {
    console.error(error);
    process.exit(1);
};
run();
//# sourceMappingURL=seed.js.map