<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/css/bootstrap.css" rel="stylesheet"/>
        <link href="css/pv.css" rel="stylesheet"/>
        <title>Pinkvilla Assignment</title>
    </head>
    <body>
        <section class="section-top-bottom">
        <div class="spinner-border"></div>

            <div id="listing" class="container">
                <?php
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_RETURNTRANSFER  => 1,
                    CURLOPT_URL 		    => "https://englishapi.xynie.com/app-api/v1/photo-gallery-feed-page/page/1"
                ));

                $culResponse = curl_exec($curl);

                if(curl_error($curl)){
                    echo 'Request Error:' . curl_error($curl);
                } else {
                    $list = json_decode($culResponse, true);
                    if(!empty($list['nodes'])){
                        foreach($list['nodes'] as $i => $row){ 
                            $diff = time() - $row['node']['last_update'];
                            $h = floor($diff/3600);
                            $d = $h > 23 ? floor($h/24) : 0;
                            $m = $h < 0 ? floor($diff/60) : 0; 
                            ?>
                            <div class="list-elem row justify-content-end flex-center-start">
                                <div class="col-xl-4">
                                    <img class="img lazy" src="" data-src="<?= $row['node']['ImageStyle_thumbnail']; ?>" alt="" style="width: 100%;" />
                                </div>
                                <div class="col-xl-8">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="section-tittle">
                                                <p><?= $row['node']['title']; ?></p>
                                            </div>
                                            <div class="time">
                                            <?= $d > 0 ? "$d DAYS": ($h > 0 ? "$h HOURS": "$m MINUTES"); ?> AGO
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php
                        }
                    }
                }
                curl_close($curl);
                ?>
            </div>
        </section>
        <script type="text/javascript" src="js/pv.js"></script>
    </body>
</html>