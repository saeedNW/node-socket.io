setInterval(() => {
    $('.progress-pie-chart').each(function () {

        let percent = parseInt($(this).data('percent'));
        let type = $(this).attr('type');
        let deg = 360 * percent / 100;

        if (percent > 50) {
            type === 'cpu' ? $(this).addClass('gt-50') : $(this).addClass('gt-50-ram')
        }

        $(this).find('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
        $(this).find('.percent-title').html(percent + '%');
    });
}, 100);

const socket = io('http://localhost:8000');

socket.on('connect', () => {
    socket.emit('joinMonitoringRoom');

    socket.on('pcData', (systemInfo) => {
        let computerHtml = `
            <div class="card" id="${systemInfo.id}">
            <div class="card-header">
                Machine Information
            </div>
                <div class="card-body">
                    <div class="statChartHolder">
                        <div class="progress-pie-chart cpuPercent-${systemInfo.id}" type="cpu" data-percent="${systemInfo.cpuUsagePercent}">
                            <div class="ppc-progress cpu-title">
                                <div class="ppc-progress-fill cpu-bg"></div>
                            </div>
                            <div class="ppc-percents cpu-title">
                                <div class="pcc-percents-wrapper">
                                    <span class="percent-title">%</span>
                                    <p>CPU Usage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="statChartHolder">
                        <div class="progress-pie-chart ramPercent-${systemInfo.id}" type="ram" data-percent="${systemInfo.memoryUsagePercent}">
                            <div class="ppc-progress ram-title">
                                <div class="ppc-progress-fill ram-bg"></div>
                            </div>
                            <div class="ppc-percents ram-title">
                                <div class="pcc-percents-wrapper">
                                    <span class="percent-title">%</span>
                                    <p>RAM Usage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="machine-info">
                        <li>
                            <span class="font-bold">Operating System :  </span><span class="font-light osType-${systemInfo.id}">${systemInfo.os_type}</span>
                        </li>
                        <li>
                            <span class="font-bold">MAC Address :  </span><span class="font-light networkMac-${systemInfo.id}"">${systemInfo.netowrkMac}</span>
                        </li>
                        <li>
                            <span class="font-bold">IP Address :  </span><span class="font-light networkIp-${systemInfo.id}"">${systemInfo.networkIp}</span>
                        </li>
                        <li><hr></li>
                        <li>
                            <span class="font-bold">CPU type :  </span><span class="font-light cpuModel-${systemInfo.id}"">${systemInfo.cpuModel}</span>
                        </li>
                        <li>
                            <span class="font-bold">Number of Cores :  </span><span class="font-light cpuCores-${systemInfo.id}"">${systemInfo.cpuCores}</span>
                        </li>
                        <li>
                            <span class="font-bold">Clock Speed :  </span><span class="font-light cpuSpeed-${systemInfo.id}"">${systemInfo.cpuSpeed}</span>
                        </li>
                        <li>
                            <span class="font-bold">Total Memory :  </span><span class="font-light ramTotal-${systemInfo.id}"">${systemInfo.memoryTotal}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        if ($(`#${systemInfo.id}`).length == 0) {
            $('.computersList').append(computerHtml);
        } else {
            $(`.cpuPercent-${systemInfo.id}`).data('percent', systemInfo.cpuUsagePercent);
            $(`.ramPercent-${systemInfo.id}`).data('percent', systemInfo.ramUsagePercent);
        }
    })
});