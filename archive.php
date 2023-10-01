<?php get_header(); ?>
<div class= "o-container u-margin-bottom-40">
    <div class= "o-row">
        <div class= "o-row__column o-row__column--span-12">
                <header>
                    <?php the_archive_title('<h1>', '</h1>'); ?>
                    <?php the_archive_description('<p>', '</p>'); ?>
                </header>
        </div>
        <div class= "o-row__column o-row__column--span-12 o-row__column--span-<?php echo 
        is_active_sidebar('primary-sidebar') ? '8' : '12'; ?>@medium">
            <main role= "main">
                <?php if(have_posts()) { ?>

                    <!-- if we have posts, we will start the loop, with the WHILE loop -->
                    <?php while(have_posts()){ ?>
                        <article <?php post_class('c-post u-margin-bottom-20')  ?>>
                            <?php the_post(); ?>
                            <h2 class = "c-post__title">
                                <a href = "<?php the_permalink() ?>" title = "<?php the_title_attribute(); ?>"><?php the_title() ?></a>
                            </h2>

                            <div class= "c-post__meta">
                                <?php _themename_post_meta(); ?>
                            </div>

                            <div class= "c-post__excerpt">
                                <?php the_excerpt(); ?>
                            </div>

                            <?php _themename_read_more_link(); ?>
                        </article>
                    <?php } ?>
                        <br><br>
                    <?php the_posts_pagination( ); ?>

                    <!-- adding action hook to allow other developers to interact with the theme code -->
                        <?php do_action('_themename_after_pagination'); ?>
                        
                <?php } else { ?>
                    <!-- else the following message will be displayed -->
                    <!-- the __() will return the string in respective language- english/chinese/hindi -->
                    <p> <?php echo apply_filters('_themename_no_posts_text',
                                esc_html__('Sorry, nothing matches your criteria.',
                                            '_themename')); 
                        ?>
                    </p>

                <?php } ?>
            </main>
        </div>
        <?php if(is_active_sidebar('primary-sidebar')) { ?>
            <div class= "o-row__column o-row__column--span-12 o-row__column--span-4@medium">
                <?php  get_sidebar(); ?>
            </div>
        <?php }  ?>
    </div>
</div>
<?php get_footer(); ?>