import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
let calendar$;

document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
            listPlugin
        ],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        events: [],
        initialView: 'timeGridWeek'
    })
    calendar.render()
    const btnAdd = document.getElementById('btn-add');
    const btnClose = document.getElementById('close-modal');
    const formGenerate = document.getElementById('form-generate');
    const domainInput = document.getElementById('domain');
    const durationInput = document.getElementById('duration');
    const addDomain = document.getElementById('add-domain');
    const sgbdOption = document.getElementById('sgbd');
    const adminSysOption = document.getElementById('admin-sys');
    const webDevOption = document.getElementById('web-dev');
    const algoOption = document.getElementById('algo');
    const commOption = document.getElementById('comm');
    const englishOption = document.getElementById('english');
    const generate = document.getElementById('generate');

    calendar.addEvent({
        title: 'SGBD',
        start: new Date()
    })
    let currentDomain = 'sgbd';
    let currentDuration = 0;
    btnAdd.addEventListener('click', handleModal);
    btnClose.addEventListener('click', handleModal);

    /**
     * Liste des matières et leurs durées respectives
     */
    let listDomain = [];

    function addToListDomain(domain = null, duration = 0) {
        if (
            domain === null || domain === '' || 
            duration === 0 || duration > 6 ||
            duration < 2 
        ) {
            throw Error('Domain or duration is incorrect or undefined');
        }

        listDomain.push({
            domain,
            duration
        })

        return listDomain;
    }


    formGenerate.addEventListener('submit', (event) => {
        event.preventDefault();
    })


    domainInput.addEventListener('change', (event) => {
        currentDomain = event.target.value;
    })

    durationInput.addEventListener('change', (event) => {
        currentDuration = event.target.value;
    })

    addDomain.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            addToListDomain(currentDomain, currentDuration);
            switch(currentDomain) {
                case 'sgbd': 
                    sgbdOption.setAttribute('disabled', true);
                    sgbdOption.setAttribute('value', '');
                    break;
                case 'admin-sys':
                    adminSysOption.setAttribute('disabled', true);
                    adminSysOption.setAttribute('value', '');
                    break;
                case 'web-dev':
                    webDevOption.setAttribute('disabled', true);
                    webDevOption.setAttribute('value', '');
                    break;
                case 'algo':
                    algoOption.setAttribute('disabled', true);
                    algoOption.setAttribute('value', '');
                    break;
                case 'comm':
                    commOption.setAttribute('disabled', true);
                    commOption.setAttribute('value', '');
                    break;
                case 'english':
                    englishOption.setAttribute('disabled', true);
                    englishOption.setAttribute('value', '');
                    break;
                default: 
                    throw Error('Unknown value in option');
            }
            if (listDomain.length === 6) {
                generate.setAttribute('disabled', false);
                console.log(listDomain)
            }
        } catch (error) {
            console.log(error);
        }
    })

    /**
     * Manages the opening and closing of the modal
     */
    function handleModal() {
        const classModalOpen = 'modal-add-schedule-display';
        const classModalClose = 'modal-add-schedule-none';
        const modal = document.getElementById('modal');

        if (modal) {
            modal.classList.toggle(`${classModalClose}`);
            modal.classList.toggle(`${classModalOpen}`);
        } else throw Error('Modal undefined');
    }


})


