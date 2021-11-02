//script de autenticacao com o back-end do node
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.2.122:4000'//IP do seu pc + porta do server do back-end
})