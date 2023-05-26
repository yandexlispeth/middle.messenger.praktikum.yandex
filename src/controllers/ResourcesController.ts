import ResourcesApi from "../api/ResourcesApi";


class ResourcesController {
    private api: ResourcesApi;

    constructor() {
        this.api = new ResourcesApi();
    }


    async get_resources(path: string) {
        try {
            await this.api.get_resources(path);
        } catch (e) {
            console.log('Не получилось', e);
        }
    }
}

export default new ResourcesController();